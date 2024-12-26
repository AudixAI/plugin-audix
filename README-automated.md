# Plugin Documentation

## Overview and Purpose
## @ai16z/plugin-near

### Package Description:
The package `@ai16z/plugin-near` provides a collection of classes and interfaces for managing NEAR Protocol tokens and wallets.

### Main Classes:
- **WalletProvider:** A class that implements the Provider interface for managing wallet functionalities.

### Key Interfaces:
- **TransferContent:** Represents the transfer of content, including recipient, amount, and optional token address for native NEAR transfers.
- **NearToken:** Represents a NEAR Protocol token with properties like name, symbol, balance, and price.
- **WalletPortfolio:** Represents a wallet portfolio with total values in USD and NEAR, and an array of NearToken objects.

### Overview:
1. **Purpose:** The plugin aims to facilitate the handling of NEAR Protocol tokens and wallets.
   
2. **Main Features:**
   - Ability to transfer content with specified recipient and amount.
   - Detailed representation of NEAR Protocol tokens with name, balance, and price information.
   - Portfolio management with total values and token arrays.

3. **Usage:** One would use this plugin when dealing with NEAR Protocol tokens and wallets, enabling easy transfer of assets and tracking of token portfolio values.

4. **Dependencies:** This plugin may require dependencies related to NEAR Protocol integration and token management libraries.

## Installation
```markdown
# Installation Instructions for @ai16z/plugin-near

## Package manager commands:
```bash
npm install @ai16z/plugin-near
```
OR
```bash
yarn add @ai16z/plugin-near
```
OR
```bash
pnpm add @ai16z/plugin-near
```

## Prerequisite installations:
- Make sure you have Node.js installed on your machine.

## Post-installation setup steps:
1. Make sure to have the following peer dependencies installed:
```bash
npm install whatwg-url@7.1.0 form-data@4.0.1
```
2. Configure the package as needed based on your application requirements.

## Verification steps:
1. Check if the package and its dependencies are successfully installed by running:
```bash
npm list @ai16z/plugin-near @ai16z/eliza @ref-finance/ref-sdk tsup near-api-js bignumber.js node-cache whatwg-url form-data
```
2. Verify that there are no errors during the installation process.

Congratulations! You have successfully installed @ai16z/plugin-near package.
```
```

## Configuration
# Configuration Documentation

## Required Environment Variables

### 1. `NEAR_ENV`
- Purpose: Specifies the NEAR environment for the application.
- Example Value: "testnet"
- Usage:
  ```javascript
  process.env.NEAR_ENV ||
  ```

### 2. `REACT_APP_REF_SDK_ENV`
- Purpose: Specifies the environment for the Ref SDK in a React application.
- Example Value: "development"
- Usage:
    ```javascript
    process.env.REACT_APP_REF_SDK_ENV
    ```

### 3. `NEAR_WALLET_SECRET_KEY`
- Purpose: Secret key for the NEAR wallet.
- Example Value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
- Usage:
    ```javascript
    process.env.NEAR_WALLET_SECRET_KEY
    ```

### 4. `NEAR_WALLET_PUBLIC_KEY`
- Purpose: Public key for the NEAR wallet.
- Example Value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
- Usage:
    ```javascript
    process.env.NEAR_WALLET_PUBLIC_KEY
    ```

### 5. `NEAR_ADDRESS`
- Purpose: Specify the NEAR address for the application.
- Example Value: "my.near.account"
- Usage:
    ```javascript
    runtime.getSetting("NEAR_ADDRESS") || process.env.NEAR_ADDRESS
    ```

### 6. `SLIPPAGE`
- Purpose: Define slippage value for transactions.
- Default Value: 1
- Usage:
    ```javascript
    SLIPPAGE: runtime.getSetting("SLIPPAGE") || process.env.SLIPPAGE
    ```

### 7. `RPC_URL`
- Purpose: Define the RPC URL for the application.
- Usage:
    ```javascript
    RPC_URL: runtime.getSetting("RPC_URL") || process.env.RPC_URL
    ```

### 8. `NEAR_NETWORK`
- Purpose: Specify the NEAR network ID for the application.
- Default Value: "testnet"
- Usage:
    ```javascript
    networkId: process.env.NEAR_NETWORK || "testnet"
    ```

### 9. `SLIPPAGE`
- Purpose: Define slippage value for transactions.
- Default Value: 1
- Usage:
    ```javascript
    SLIPPAGE: process.env.SLIPPAGE ? parseInt(process.env.SLIPPAGE) : 1
    ```

## Related Configuration Variables

### 1. `nodeUrl`
- Purpose: Define the node URL for the application.
- Usage:
    ```javascript
    nodeUrl: process.env.RPC_URL || `https://rpc.${process.env.NEAR_NETWORK || "testnet"}.near.org`
    ```

### 2. `walletUrl`
- Purpose: Define the wallet URL for the application.
- Usage:
    ```javascript
    walletUrl: `https://${process.env.NEAR_NETWORK || "testnet"}.mynearwallet.com/`
    ```

### 3. `helperUrl`
- Purpose: Define the helper URL for the application.
- Usage:
    ```javascript
    helperUrl: `https://helper.${process.env.NEAR_NETWORK || "testnet"}.near.org`
    ```

### 4. `explorerUrl`
- Purpose: Define the explorer URL for the application.
- Usage:
    ```javascript
    explorerUrl: `https://${process.env.NEAR_NETWORK || "testnet"}.nearblocks.io`
    ``` 

## Notes
- For variables like `NEAR_ADDRESS` and `SLIPPAGE`, the application first checks for settings and falls back to environment variables if not set.
- The `SLIPPAGE` variable is parsed to an integer with a default value of 1 if not provided through environment variables.

## Usage Examples
## Basic usage example

```javascript
const walletProvider = new WalletProvider("1234567890");
```

## Common use cases

1. Connecting to NEAR blockchain:

```javascript
const account = await walletProvider.connect(runtime);
```

2. Fetching portfolio value:

```javascript
const portfolio = await walletProvider.fetchPortfolioValue(runtime);
```

3. Formatting portfolio:

```javascript
const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolio);
```

## Advanced usage patterns

1. Fetching NEAR price with retry mechanism:

```javascript
const nearPrice = await walletProvider.fetchWithRetry("https://api.near.org/", {});
```

2. Getting formatted portfolio value:

```javascript
const formattedPortfolioValue = await walletProvider.getFormattedPortfolio(runtime);
```

## Best practices

- Ensure NEAR wallet credentials are properly configured before connecting to the NEAR blockchain.
- Cache portfolio values and NEAR prices to improve performance and reduce API calls.

## Code snippets demonstrating key features

1. Fetching NEAR price in USD asynchronously:

```javascript
const nearPrice = await walletProvider.fetchNearPrice();
```

2. Retrieving formatted portfolio for a given agent runtime:

```javascript
const formattedPortfolio = await walletProvider.get(runtime, memory, state);
```

## API Reference
# API Reference Documentation

## Classes

### WalletProvider
```javascript
/**
 * WalletProvider class that implements the Provider interface.
 */
```

#### Methods

#### constructor
```javascript
/**
 * Constructor for creating a new instance with given account ID.
 * @param {string} accountId - The ID of the account.
 */
```

#### get
```javascript
/**
 * Asynchronously retrieves the formatted portfolio for a given agent runtime.
 *
 * @param {IAgentRuntime} runtime - The agent runtime instance
 * @param {Memory} _message - The memory object representing the message
 * @param {State} [_state] - Optional state object
 * @returns {Promise<string | null>} A promise that resolves with the formatted portfolio or null if an error occurs
 */
```

#### connect
```javascript
/**
 * Connect to NEAR blockchain using the provided runtime.
 * @param {IAgentRuntime} runtime - The runtime object used to get NEAR wallet settings.
 * @returns {Promise<object>} The NEAR blockchain account object.
 * @throws {Error} If NEAR wallet credentials are not configured.
 */
```

#### fetchWithRetry
```javascript
/**
 * Fetches the data from the specified URL with retry mechanism.
 * 
 * @param {string} url - The URL to fetch the data from.
 * @param {RequestInit} options - The options to be passed to the fetch call, default is an empty object.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
```

#### fetchPortfolioValue
```javascript
/**
 * Fetches the current value of the portfolio for the account.
 * If the portfolio value is available in cache, it will return the cached value.
 * If not, it will connect to the runtime, fetch the account balance,
 * convert NEAR amount to USD, fetch NEAR price in USD, calculate the total value in USD,
 * construct a WalletPortfolio object, cache the portfolio value, and return it.
 * @param {IAgentRuntime} runtime - The runtime to use for fetching portfolio value.
 * @returns {Promise<WalletPortfolio>} A Promise that resolves to the current portfolio value.
 */
```

#### fetchNearPrice
```javascript
/**
 * Asynchronously fetch the current NEAR price in USD from an external API.
 * If the price is cached, return it from cache. Otherwise, make a request to the API
 * to fetch the latest price, store it in cache, and return it.
 * 
 * @returns {Promise<number>} The current NEAR price in USD.
 */
```

#### formatPortfolio
```javascript
/**
 * Format the given `portfolio` into a human-readable string representation containing system, account ID, total value, token balances, and market prices.
 * @param {IAgentRuntime} runtime - The runtime information.
 * @param {WalletPortfolio} portfolio - The wallet portfolio to format.
 * @returns {string} The formatted portfolio string.
 */
```

#### getFormattedPortfolio
```javascript
/**
 * Asynchronously fetches the portfolio value using the provided IAgentRuntime instance and formats the result as a string.
 * 
 * @param {IAgentRuntime} runtime - The runtime instance to use for fetching portfolio information.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value as a string, or a message indicating failure.
 */
```

## Interfaces

### TransferContent
```javascript
/**
 * Interface representing the transfer of content.
 * @typedef {object} TransferContent
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount being transferred.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### NearToken
```javascript
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
```

### WalletPortfolio
```javascript
/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - Total value in USD.
 * @property {string} [totalNear] - Total value in NEAR (optional).
 * @property {Array<NearToken>} tokens - Array of NearToken objects representing tokens in the portfolio.
 */
```

## Types

### NearConfig
```javascript
/**
 * Represents the NearConfig type which is inferred from the nearEnvSchema schema.
 */
```

## Common Issues & Troubleshooting
# Troubleshooting Guide

## Common Issues and Solutions
1. **Missing Package Dependencies:**
   - **Solution:** Check if all required package dependencies are installed by running `npm install`. If any are missing, add them to your `package.json` file and reinstall packages.

2. **Error Handling in Methods:**
   - **Solution:** Make sure to handle errors appropriately in the `get` and `connect` methods as per the provided comments in the code.

## Error Messages and Meanings
1. **Error: NEAR wallet credentials are not configured.**
   - **Meaning:** This error occurs when trying to connect to the NEAR blockchain without proper wallet credentials configured.
   
## Debugging Tips
- Use console.log statements throughout the code to track the flow and identify potential issues.
- Utilize the browser developer tools or Node.js debugger for more in-depth debugging.

## Configuration Problems
- Ensure that all necessary configurations (such as NEAR wallet settings) are correctly set up in the code.

## Compatibility Issues
- Check for compatibility issues between different versions of the packages listed in the dependencies.

## Performance Optimization
- Consider optimizing the code by refactoring or using asynchronous operations where applicable to improve performance.

## FAQ (Frequently Asked Questions)
1. **Q:** How can I resolve package dependency conflicts?
   **A:** You can try updating the conflicting packages to compatible versions or use a package manager like Yarn for better dependency management.

2. **Q:** How can I troubleshoot errors related to NEAR blockchain connectivity?
   **A:** Double-check your NEAR wallet credentials and make sure they are correctly configured. If the issue persists, reach out to NEAR blockchain support for assistance.

---
By following these troubleshooting tips and guidelines, you should be able to address common issues and resolve errors effectively in your code. If you encounter any other difficulties, don't hesitate to seek additional support from the developer community or relevant forums.

## TODO Items
# TODO Section

## General:
1. **TODO: Add functionality to support multiple networks**
    - Add support for fetching token metadata and pools data based on different network configurations.
    - Update network related settings and connections dynamically based on runtime settings.

## File Location:
- File: `swapToken.ts`

---

```typescript
// Code snippet with TODO comments
async function swapToken(
    runtime: IAgentRuntime,
    inputTokenId: string,
    outputTokenId: string,
    amount: string,
    slippageTolerance: number = Number(
        runtime.getSetting("SLIPPAGE_TOLERANCE")
    ) || 0.01
): Promise<any> {
    try {
        // Existing code implementation
    } catch (error) {
        console.error("Error in swapToken:", error);
        throw error;
    }
}
```

# Priority: 
- High priority as it involves adding a fundamental feature to the existing functionality.
