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
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals the token uses.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of tokens in a user-friendly format.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The total value of the token in USD.
 * @property {string} [valueNear] - The total value of the token in NEAR Protocol currency (optional).
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
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - Total value in USD.
 * @property {string} [totalNear] - Total value in NEAR (optional).
 * @property {Array<NearToken>} tokens - Array of NearToken objects representing tokens in the portfolio.
 */
interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: Array<NearToken>;
}

/**
 * WalletProvider class that implements the Provider interface.
 */
         
export class WalletProvider implements Provider {
    private cache: NodeCache;
    private account: Account | null = null;
    private keyStore: keyStores.InMemoryKeyStore;
/**
 * Constructor for creating a new instance with given account ID.
 * @param {string} accountId - The ID of the account.
 */
    constructor(private accountId: string) {
        this.cache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 5 minutes
        this.keyStore = new keyStores.InMemoryKeyStore();
    }

/**
 * Asynchronously retrieves the formatted portfolio for a given agent runtime.
 *
 * @param {IAgentRuntime} runtime - The agent runtime instance
 * @param {Memory} _message - The memory object representing the message
 * @param {State} [_state] - Optional state object
 * @returns {Promise<string | null>} A promise that resolves with the formatted portfolio or null if an error occurs
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
 * Connect to NEAR blockchain using the provided runtime.
 * @param {IAgentRuntime} runtime - The runtime object used to get NEAR wallet settings.
 * @returns {Promise<object>} The NEAR blockchain account object.
 * @throws {Error} If NEAR wallet credentials are not configured.
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
 * Fetches the data from the specified URL with retry mechanism.
 * 
 * @param {string} url - The URL to fetch the data from.
 * @param {RequestInit} options - The options to be passed to the fetch call, default is an empty object.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
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
 * Fetches the current value of the portfolio for the account.
 * If the portfolio value is available in cache, it will return the cached value.
 * If not, it will connect to the runtime, fetch the account balance,
 * convert NEAR amount to USD, fetch NEAR price in USD, calculate the total value in USD,
 * construct a WalletPortfolio object, cache the portfolio value, and return it.
 * @param {IAgentRuntime} runtime - The runtime to use for fetching portfolio value.
 * @returns {Promise<WalletPortfolio>} A Promise that resolves to the current portfolio value.
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
 * Asynchronously fetch the current NEAR price in USD from an external API.
 * If the price is cached, return it from cache. Otherwise, make a request to the API
 * to fetch the latest price, store it in cache, and return it.
 * 
 * @returns {Promise<number>} The current NEAR price in USD.
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
 * Format the given `portfolio` into a human-readable string representation containing system, account ID, total value, token balances, and market prices.
 * @param {IAgentRuntime} runtime - The runtime information.
 * @param {WalletPortfolio} portfolio - The wallet portfolio to format.
 * @returns {string} The formatted portfolio string.
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
 * Asynchronously fetches the portfolio value using the provided IAgentRuntime instance and formats the result as a string.
 * 
 * @param {IAgentRuntime} runtime - The runtime instance to use for fetching portfolio information.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value as a string, or a message indicating failure.
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