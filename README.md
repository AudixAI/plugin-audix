# Plugin Documentation

## Overview and Purpose
## **@ai16z/plugin-near**

### **Overview:**
This package provides functionalities for interacting with a wallet in the NEAR Protocol ecosystem. It includes classes and interfaces for managing wallet providers, transferring content, and displaying wallet portfolios.

### **Main Classes:**
- **WalletProvider**: Handles interactions with a wallet, fetching portfolio value, and formatting the portfolio for display.

### **Key Interfaces:**
- **TransferContent**: Represents the content of a transfer with fields for recipient, amount, and token address.
- **NearToken**: Represents a token in the NEAR Protocol ecosystem with properties like name, symbol, balance, price, and value.
- **WalletPortfolio**: Represents a wallet portfolio with total USD value, optional NEAR value, and an array of token objects.

### **Features and Capabilities:**
- Interaction with a NEAR Protocol wallet
- Fetching and formatting wallet portfolio data
- Transfer content management for transactions

### **Use Cases:**
- Users wanting to manage and display their NEAR Protocol wallet portfolio
- Developers building applications that interact with NEAR wallets and tokens
- Individuals interested in transferring NEAR tokens securely and efficiently

### **Dependencies:**
- This package may have dependencies on NEAR Protocol libraries or interfaces for seamless integration with the NEAR ecosystem.

## Installation
```markdown
# Installation Instructions for @ai16z/plugin-near

## Package Manager Commands
1. Using npm:
```bash
npm install @ai16z/plugin-near @ai16z/eliza@workspace:* @ref-finance/ref-sdk@^1.4.6 tsup@8.3.5 near-api-js@5.0.1 bignumber.js@9.1.2 node-cache@5.1.2 whatwg-url@7.1.0 form-data@4.0.1
```

2. Using yarn:
```bash
yarn add @ai16z/plugin-near @ai16z/eliza@workspace:* @ref-finance/ref-sdk@^1.4.6 tsup@8.3.5 near-api-js@5.0.1 bignumber.js@9.1.2 node-cache@5.1.2 whatwg-url@7.1.0 form-data@4.0.1
```

3. Using pnpm:
```bash
pnpm add @ai16z/plugin-near @ai16z/eliza@workspace:* @ref-finance/ref-sdk@^1.4.6 tsup@8.3.5 near-api-js@5.0.1 bignumber.js@9.1.2 node-cache@5.1.2 whatwg-url@7.1.0 form-data@4.0.1
```

## Prerequisite Installations
- Ensure you have Node.js installed on your system.

## Post-Installation Setup Steps
- No specific post-installation setup steps are required for this package.

## Verification Steps
1. Check if the package was installed successfully:
   - Run the command `npm ls @ai16z/plugin-near` to verify the installation.
2. Check if the dependencies and peer dependencies were installed:
   - Run the command `npm ls` to see the full dependency tree and ensure all packages are present.

If you encounter any issues during the installation process, please refer to the package documentation or reach out to the package maintainers for support.
```


## Configuration
# Configuration Documentation

## Configuration Classes

- N/A

## Package Configuration (from package.json)

```json
{}
```

## Include

1. **Required Configuration Options**
   
   - *N/A*

2. **Optional Configuration Settings**
   
   - *N/A*

3. **Configuration File Format and Location**
   
   - The configuration file format is in JSON and should be located at the root of the project directory.

4. **Environment Variables**
   
   - *N/A*

5. **Default Values**
   
   - *N/A*

6. **Configuration Examples**
   
   - *N/A*

## Usage Examples
### Basic Usage Example:

1. Creating a Wallet Provider instance:
```javascript
const walletProvider = new WalletProvider("accountId123");
```

2. Fetching and formatting a portfolio:
```javascript
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

### Common Use Cases:

1. Establishing a connection and fetching the portfolio value:
```javascript
const account = await walletProvider.connect(runtime);
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
console.log(portfolioValue);
```

2. Fetching the NEAR price and formatting the portfolio:
```javascript
const nearPrice = await walletProvider.fetchNearPrice();
console.log(nearPrice);

const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolio);
console.log(formattedPortfolio);
```

### Advanced Usage Patterns:

1. Fetching data with retry on failure:
```javascript
const url = "https://api.example.com/data";
const data = await walletProvider.fetchWithRetry(url);
console.log(data);
```

2. Handling errors and logging messages:
```javascript
try {
    const account = await walletProvider.connect(runtime);
} catch (error) {
    console.error("Error connecting to NEAR blockchain:", error);
}
```

### Best Practices:

1. Always handle Promise rejections to avoid uncaught errors.
2. Use proper error handling to gracefully manage failures.
3. Cache data when possible to improve performance and reduce unnecessary API calls.

### Code Snippets Demonstrating Key Features:

1. Constructing a Wallet Provider instance:
```javascript
const walletProvider = new WalletProvider("accountId123");
```

2. Fetching the formatted portfolio:
```javascript
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

## API Reference
# API Reference

## Classes

### WalletProvider
A class representing a Wallet Provider that implements the Provider interface. It handles interactions with a wallet, fetching portfolio value, and formatting the portfolio for display.

#### Methods

##### constructor
Constructor for creating an instance of a class.
```javascript
/**
 * @param {string} accountId - The accountId associated with the instance
 */
```

##### get
Asynchronously retrieves a formatted portfolio using the provided runtime.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime to use for retrieving the portfolio.
 * @param {Memory} _message - The message data, not used in this method.
 * @param {State} [_state] - The optional state data to use.
 * @returns {Promise<string | null>} The formatted portfolio as a string or null if an error occurs.
 */
```

##### connect
Establishes a connection to NEAR blockchain using the provided runtime.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime to use for connecting to NEAR blockchain
 * @returns {Promise<Account>} - The connected NEAR account
 */
```

##### fetchWithRetry
Fetches data from a URL with retries in case of failure.
```javascript
/**
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} - A Promise that resolves to the fetched data.
 */
```

##### fetchPortfolioValue
Asynchronously fetches the value of the portfolio for the account associated with the provided runtime.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime associated with the account
 * @returns {Promise<WalletPortfolio>} - The value of the portfolio for the account
 */
```

##### fetchNearPrice
Asynchronously fetches the current NEAR price in USD from the CoinGecko API.
```javascript
/**
 * @returns {Promise<number>} The current NEAR price in USD.
 */
```

##### formatPortfolio
Format the portfolio information for display.
```javascript
/**
 * @param {IAgentRuntime} runtime - The agent runtime.
 * @param {WalletPortfolio} portfolio - The portfolio to format.
 * @returns {string} The formatted portfolio information.
 */
 
##### getFormattedPortfolio
Asynchronously retrieves the portfolio value using the provided agent runtime and formats the portfolio information.
```javascript
/**
 * @param {IAgentRuntime} runtime - The agent runtime used to fetch the portfolio value.
 * @returns {Promise<string>} The formatted portfolio as a string.
 */

## Interfaces

### TransferContent
Interface representing the content of a transfer.
```javascript
/**
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */

### NearToken
Represents a token in the NEAR Protocol ecosystem.
```javascript
/**
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals the token uses.
 * @property {string} balance - The current balance of the token.
 * @property {string} uiAmount - The amount of the token displayed in the user interface.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The additional value of the token in NEAR Protocol's native coin, NEAR.
 */

### WalletPortfolio
Interface representing a wallet portfolio.
```javascript
/**
 * @property {string} totalUsd - The total USD value in the wallet.
 * @property {string} [totalNear] - The total NEAR value in the wallet (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing various tokens in the wallet.
 */
 
## Types

### NearConfig
Represents the configuration for the NEAR environment.

## Common Issues & Troubleshooting
# Troubleshooting Guide

## Common Issues and Solutions

1. **Dependency Installation Issues**:
   - **Issue**: Package dependencies not installing or mismatched versions.
   - **Solution**: Run `npm install` to ensure all dependencies are properly installed.

2. **Error Handling Issues**:
   - **Issue**: Errors occurring during method execution.
   - **Solution**: Check error handling logic in the methods to ensure proper error messages are logged and returned.

## Error Messages and Their Meaning

1. **Error Message**: `Error: NEAR wallet secret key not configured`
   - **Meaning**: The NEAR wallet secret key is not configured in the runtime settings.
   - **Solution**: Configure the NEAR wallet secret key in the runtime settings before connecting to the NEAR blockchain.

2. **Error Message**: `Error fetching NEAR price: API request failed`
   - **Meaning**: The fetch request to the CoinGecko API for the NEAR price failed.
   - **Solution**: Check the network connection and try again. If the issue persists, look into potential API rate limits or server issues.

## Debugging Tips

- Use console.log statements in the methods to track the flow of execution and pinpoint where errors occur.
- Utilize debugger tools in IDEs like Visual Studio Code to step through the code and identify issues.

## Configuration Problems

- Make sure all necessary configurations, such as NEAR wallet secret key and API keys, are properly set up in the runtime settings.
- Double-check dependencies and ensure compatibility with the environment.

## Compatibility Issues

- Verify that the versions of package dependencies listed in the `package.json` file are compatible with each other.
- Check for any known compatibility issues with the runtime environment.

## Performance Optimization

- Implement caching mechanisms for frequently accessed data like NEAR prices to improve performance.
- Optimize API requests by batching multiple requests together where possible.

## FAQ Section

**Q: What can I do if I encounter a "Module not found" error?**
A: Make sure the required module is listed in the `package.json` file and properly installed using npm.

**Q: How can I improve the response time of fetchNearPrice method?**
A: Consider implementing a caching strategy to store and retrieve the NEAR price locally to reduce API requests.

**Q: Can I use this SDK with other blockchains besides NEAR?**
A: The SDK is designed specifically for NEAR blockchain interactions, but you can explore extending its capabilities for other blockchains with additional development.

Remember to consult the documentation and community forums for further assistance with specific issues or questions.
