import { IAgentRuntime, Memory, Provider, State } from "@ai16z/eliza";
import { KeyPair, keyStores, connect, Account, utils } from "near-api-js";
import BigNumber from "bignumber.js";
import { KeyPairString } from "near-api-js/lib/utils";
import NodeCache from "node-cache";

const PROVIDER_CONFIG = {
    networkId: process.env.NEAR_NETWORK || "testnet",
    nodeUrl: process.env.RPC_URL || `https://rpc.${process.env.NEAR_NETWORK || "testnet"}.near.org`,
    walletUrl: `https://${process.env.NEAR_NETWORK || "testnet"}.mynearwallet.com/`,
    helperUrl: `https://helper.${process.env.NEAR_NETWORK || "testnet"}.near.org`,
    explorerUrl: `https://${process.env.NEAR_NETWORK || "testnet"}.nearblocks.io`,
    MAX_RETRIES: 3,
    RETRY_DELAY: 2000,
    SLIPPAGE: process.env.SLIPPAGE ? parseInt(process.env.SLIPPAGE) : 1,
};

/**
 * Interface representing a NEAR Protocol token.
 * 
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places the token uses.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for display purposes.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} valueNear - The value of the token in NEAR Protocol tokens (optional).
 */
export interface NearToken {
    name: string;
    symbol: string;
    decimals: number;
    balance: string;
    uiAmount: string;
    priceUsd: string;
    valueUsd: string;
    valueNear?: string;
}

/**
 * Interface representing a wallet portfolio.
 * 
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - Total amount in USD.
 * @property {string} [totalNear] - Optional total amount in NEAR tokens.
 * @property {Array<NearToken>} tokens - Array of NearToken objects.
 */
interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: Array<NearToken>;
}

/**
* Class representing a Wallet Provider.
*/
*/
export class WalletProvider implements Provider {
    private cache: NodeCache;
    private account: Account | null = null;
    private keyStore: keyStores.InMemoryKeyStore;
/**
 * Creates a new instance of the class with the specified account ID.
 * Initializes a new NodeCache instance with a cache time-to-live of 5 minutes.
 * Sets up an in-memory key store as the keyStore.
 * @param {string} accountId - The account ID associated with the instance.
 */
    constructor(private accountId: string) {
        this.cache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 5 minutes
        this.keyStore = new keyStores.InMemoryKeyStore();
    }

/**
 * Retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {Memory} _message - The message to be used for retrieval.
 * @param {State} [_state] - Optional state parameter.
 * @returns {Promise<string | null>} The formatted portfolio data, or null if there was an error.
 */
    async get(
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<string | null> {
        try {
            return await this.getFormattedPortfolio(runtime);
        } catch (error) {
            console.error("Error in wallet provider:", error);
            return null;
        }
    }

/**
 * Connects to NEAR wallet using the provided runtime object.
 * 
 * @param {IAgentRuntime} runtime - The runtime object that provides access to settings.
 * @returns {Promise<object>} - Returns the NEAR account object once connected.
 * @throws {Error} - Throws an error if NEAR wallet credentials are not configured.
 */
    public async connect(runtime: IAgentRuntime) {
        if (this.account) return this.account;

        const secretKey = runtime.getSetting("NEAR_WALLET_SECRET_KEY");
        const publicKey = runtime.getSetting("NEAR_WALLET_PUBLIC_KEY");

        if (!secretKey || !publicKey) {
            throw new Error("NEAR wallet credentials not configured");
        }

        // Create KeyPair from secret key
        const keyPair = KeyPair.fromString(secretKey as KeyPairString);

        // Set the key in the keystore
        await this.keyStore.setKey(PROVIDER_CONFIG.networkId, this.accountId, keyPair);

        const nearConnection = await connect({
            networkId: PROVIDER_CONFIG.networkId,
            keyStore: this.keyStore,
            nodeUrl: PROVIDER_CONFIG.nodeUrl,
            walletUrl: PROVIDER_CONFIG.walletUrl,
            helperUrl: PROVIDER_CONFIG.helperUrl,
        });

        this.account = await nearConnection.account(this.accountId);
        return this.account;
    }

/**
 * Fetches data from a URL with retry logic.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options to include in the fetch request.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 */
    private async fetchWithRetry(
        url: string,
        options: RequestInit = {}
    ): Promise<any> {
        let lastError: Error;

        for (let i = 0; i < PROVIDER_CONFIG.MAX_RETRIES; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Attempt ${i + 1} failed:`, error);
                lastError = error as Error;
                if (i < PROVIDER_CONFIG.MAX_RETRIES - 1) {
                    await new Promise(resolve =>
                        setTimeout(resolve, PROVIDER_CONFIG.RETRY_DELAY * Math.pow(2, i))
                    );
                }
            }
        }
        throw lastError!;
    }

/**
 * Fetches the portfolio value for the current account.
 * If the value is found in the cache, it returns the cached value.
 * Otherwise, it connects to the account, fetches the account balance,
 * converts yoctoNEAR to NEAR, fetches the NEAR price in USD, computes
 * the total USD value of the portfolio, and constructs and caches
 * a `WalletPortfolio` object containing the total USD value, total NEAR balance,
 * and an array of tokens including details like token name, symbol, balance, UI amount,
 * price in USD, and value in USD.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to use for fetching account information.
 * @returns {Promise<WalletPortfolio>} The portfolio value object containing total USD value, total NEAR balance, and token information.
 */
    async fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio> {
        try {
            const cacheKey = `portfolio-${this.accountId}`;
            const cachedValue = this.cache.get<WalletPortfolio>(cacheKey);

            if (cachedValue) {
                console.log("Cache hit for fetchPortfolioValue");
                return cachedValue;
            }

            const account = await this.connect(runtime);
            const balance = await account.getAccountBalance();

            // Convert yoctoNEAR to NEAR
            const nearBalance = utils.format.formatNearAmount(balance.available);

            // Fetch NEAR price in USD
            const nearPrice = await this.fetchNearPrice();
            const valueUsd = new BigNumber(nearBalance).times(nearPrice);

            const portfolio: WalletPortfolio = {
                totalUsd: valueUsd.toString(),
                totalNear: nearBalance,
                tokens: [{
                    name: "NEAR Protocol",
                    symbol: "NEAR",
                    decimals: 24,
                    balance: balance.available,
                    uiAmount: nearBalance,
                    priceUsd: nearPrice.toString(),
                    valueUsd: valueUsd.toString(),
                }]
            };

            this.cache.set(cacheKey, portfolio);
            return portfolio;
        } catch (error) {
            console.error("Error fetching portfolio:", error);
            throw error;
        }
    }

/**
 * Fetches the near price from the Coingecko API and returns it.
 * If the price is available in the cache, returns the cached value.
 * If the price is not in the cache, fetches it from the API, stores it in the cache, and returns it.
 * If there is an error during the fetch process, logs the error and returns 0.
 * @returns {Promise<number>} The NEAR price in USD
 */
    private async fetchNearPrice(): Promise<number> {
        const cacheKey = "near-price";
        const cachedPrice = this.cache.get<number>(cacheKey);

        if (cachedPrice) {
            return cachedPrice;
        }

        try {
            const response = await this.fetchWithRetry(
                "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
            );
            const price = response.near.usd;
            this.cache.set(cacheKey, price);
            return price;
        } catch (error) {
            console.error("Error fetching NEAR price:", error);
            return 0;
        }
    }

/**
 * Formats the portfolio information for display.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {WalletPortfolio} portfolio - The portfolio object containing wallet information.
 * @returns {string} Formatted string with portfolio information.
 */
    formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string {
        let output = `${runtime.character.system}\n`;
        output += `Account ID: ${this.accountId}\n\n`;

        const totalUsdFormatted = new BigNumber(portfolio.totalUsd).toFixed(2);
        const totalNearFormatted = portfolio.totalNear;

        output += `Total Value: $${totalUsdFormatted} (${totalNearFormatted} NEAR)\n\n`;
        output += "Token Balances:\n";

        for (const token of portfolio.tokens) {
            output += `${token.name} (${token.symbol}): ${token.uiAmount} ($${new BigNumber(token.valueUsd).toFixed(2)})\n`;
        }

        output += "\nMarket Prices:\n";
        output += `NEAR: $${new BigNumber(portfolio.tokens[0].priceUsd).toFixed(2)}\n`;

        return output;
    }

/**
 * Asynchronously retrieves the portfolio value using the provided agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @returns {Promise<string>} A promise that resolves with a formatted portfolio string.
 */
    async getFormattedPortfolio(runtime: IAgentRuntime): Promise<string> {
        try {
            const portfolio = await this.fetchPortfolioValue(runtime);
            return this.formatPortfolio(runtime, portfolio);
        } catch (error) {
            console.error("Error generating portfolio report:", error);
            return "Unable to fetch wallet information. Please try again later.";
        }
    }
}

const walletProvider: Provider  = {
    get: async (
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<string | null> => {
        try {
            const accountId = runtime.getSetting("NEAR_ADDRESS");
            if (!accountId) {
                throw new Error("NEAR_ADDRESS not configured");
            }
            const provider = new WalletProvider(accountId);
            return await provider.getFormattedPortfolio(runtime);
        } catch (error) {
            console.error("Error in wallet provider:", error);
            return null;
        }
    },
};


export { walletProvider };