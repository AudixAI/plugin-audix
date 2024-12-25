# Plugin Documentation

## Overview and Purpose
### Plugin Overview: @ai16z/plugin-near

#### 1. Purpose:
The @ai16z/plugin-near is a plugin designed to provide functionalities related to NEAR Protocol's wallet management. It includes classes and interfaces for handling wallet providers, transfers, and token information within the NEAR ecosystem.

#### 2. Main Features and Capabilities:
- `WalletProvider`: A class representing a wallet provider for interacting with NEAR wallets.
- `TransferContent` Interface: Represents the transfer of content, including recipient, amount, and optional token address.
- `NearToken` Interface: Represents a NEAR Protocol token with details like name, symbol, balance, and price in USD.
- `WalletPortfolio` Interface: Represents a wallet portfolio with total USD value, optional total NEAR value, and an array of NearToken objects.

#### 3. When and Why to Use:
Users can leverage the @ai16z/plugin-near plugin to manage NEAR Protocol wallets, transfer content between recipients, access token information, and view their portfolio's value in USD and NEAR tokens. This plugin is beneficial for developers and users working with NEAR Protocol who require wallet management and token-related functionalities.

#### 4. Key Dependencies or Requirements:
- This plugin is dependent on NEAR Protocol's ecosystem and wallets for full functionality.
- Users should have a basic understanding of NEAR Protocol and its token standards to effectively utilize the plugin.

Overall, the @ai16z/plugin-near plugin serves as a handy tool for managing NEAR wallets, transfers, and token information within the NEAR ecosystem.

## Installation
# Installation Instructions for @ai16z/plugin-near

## Prerequisites
Make sure you have Node.js and your preferred package manager (npm, yarn, pnpm) installed on your system.

## Package Manager Commands
### Using npm:
```sh
npm install @ai16z/plugin-near
```

### Using yarn:
```sh
yarn add @ai16z/plugin-near
```

### Using pnpm:
```sh
pnpm add @ai16z/plugin-near
```

## Dependencies
The package has the following dependencies:
- @ai16z/eliza@workspace:*
- @ref-finance/ref-sdk@^1.4.6
- tsup@8.3.5
- near-api-js@5.0.1
- bignumber.js@9.1.2
- node-cache@5.1.2

## Peer Dependencies
Additionally, the package requires the following peer dependencies:
- whatwg-url@7.1.0
- form-data@4.0.1

## Post-Installation Setup Steps
No post-installation setup steps are required for this package.

## Verification Steps
To verify that the installation was successful, you can check the package.json file in your project directory to ensure that @ai16z/plugin-near is listed as a dependency. Additionally, you can test the functionality of the package within your project to confirm that it is working as expected.

## Configuration
# Configuration Documentation

## Configuration Classes

- [Class A](#class-a)
- [Class B](#class-b)
- [Class C](#class-c)

## Package Configuration

```json
{}
```

## Class A

### Required Configuration Options

- Option 1
- Option 2

### Optional Configuration Settings

- Setting 1
- Setting 2

### Configuration File Format and Location

- The configuration file for Class A should be named `configA.json` and located in the root directory of the project.

### Environment Variables

- `CLASS_A_OPTION_1`
- `CLASS_A_OPTION_2`

### Default Values

- Option 1: `default_value_1`
- Option 2: `default_value_2`

### Configuration Examples

```json
{
  "Option1": "example_value_1",
  "Option2": "example_value_2"
}
```

## Class B

### Required Configuration Options

- Option X
- Option Y

### Optional Configuration Settings

- Setting X
- Setting Y

### Configuration File Format and Location

- The configuration file for Class B should be named `configB.json` and located in the root directory of the project.

### Environment Variables

- `CLASS_B_OPTION_X`
- `CLASS_B_OPTION_Y`

### Default Values

- Option X: `default_value_X`
- Option Y: `default_value_Y`

### Configuration Examples

```json
{
  "OptionX": "example_value_X",
  "OptionY": "example_value_Y"
}
```

## Class C

### Required Configuration Options

- Option Alpha
- Option Beta

### Optional Configuration Settings

- Setting Alpha
- Setting Beta

### Configuration File Format and Location

- The configuration file for Class C should be named `configC.json` and located in the root directory of the project.

### Environment Variables

- `CLASS_C_OPTION_ALPHA`
- `CLASS_C_OPTION_BETA`

### Default Values

- Option Alpha: `default_value_alpha`
- Option Beta: `default_value_beta`

### Configuration Examples

```json
{
  "OptionAlpha": "example_value_alpha",
  "OptionBeta": "example_value_beta"
}
```

## Usage Examples
### Basic usage example

#### Initialize a Wallet Provider
```javascript
const walletProvider = new WalletProvider("myAccountId");
```

#### Connect to NEAR wallet
```javascript
const connectedWallet = await walletProvider.connect(runtime);
```

#### Fetch portfolio value
```javascript
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
```

### Common use cases

#### Fetch portfolio value with retry logic
```javascript
const portfolioValue = await walletProvider.fetchWithRetry("https://example.com/portfolio");
```

#### Get formatted portfolio
```javascript
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
```

### Advanced usage patterns

#### Fetch NEAR price and format portfolio
```javascript
const nearPrice = await walletProvider.fetchNearPrice();
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolioValue);
```

#### Check cached portfolio value
```javascript
const cachedPortfolioValue = walletProvider.get(runtime, _message, _state);
```

### Best practices

- Use `fetchWithRetry()` method for making reliable data fetch requests.
- Cache portfolio value and NEAR price for quicker access.
- Always handle errors thrown by the methods to ensure a smooth user experience.

## API Reference
## WalletProvider Class

*Class representing a Wallet Provider.*

**Methods:**

### constructor
```javascript
/**
 * Constructor for the class, initializes NodeCache with a TTL of 300 seconds and creates a new InMemoryKeyStore.
 * @param {string} accountId - The account ID to be used.
 */
```

### get
```javascript
/**
 * Asynchronously retrieves the formatted portfolio from the runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime to retrieve the portfolio from.
 * @param {Memory} _message - The memory object (not used in this method).
 * @param {State} [_state] - Optional state object (not used in this method).
 * @returns {Promise<string | null>} A Promise that resolves to a string representing the formatted portfolio, or null if an error occurs.
 */
```

### connect
```javascript
/**
 * Connects to NEAR wallet using the provided runtime and initializes the account.
 * 
 * @param {IAgentRuntime} runtime - The runtime object to use for getting NEAR wallet settings.
 * @returns {Promise<any>} The connected NEAR wallet account.
 * @throws {Error} If NEAR wallet credentials are not configured, an error is thrown.
 */
```

### fetchWithRetry
```javascript
/**
 * Fetches data from a given URL with retry logic in case of failure.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options to be used in the fetch request.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
```

### fetchPortfolioValue
```javascript
/**
 * Asynchronously fetches the value of the portfolio for the current account.
 * If the portfolio value has been previously fetched and cached, it will return the cached value.
 * Otherwise, it will fetch the account balance, convert NEAR amount to USD, fetch NEAR price in USD,
 * calculate the total USD value of the portfolio, and return the portfolio object.
 * 
 * @param {IAgentRuntime} runtime - The runtime object used to connect to the account.
 * @returns {Promise<WalletPortfolio>} A Promise that resolves to the portfolio value object.
 */
```

### fetchNearPrice
```javascript
/**
 * Fetches the NEAR price from an API and returns it.
 * If the price is found in cache, it will be retrieved from there.
 * If not found in cache, it will fetch the price from the provided API endpoint
 * and store it in cache for future use.
 * 
 * @returns {Promise<number>} The NEAR price in USD.
 */
```

### formatPortfolio
```javascript
/**
 * Format the given portfolio data into a user-friendly string format.
 *
 * @param {IAgentRuntime} runtime - The runtime context of the agent.
 * @param {WalletPortfolio} portfolio - The portfolio data to be formatted.
 * @returns {string} The formatted output string containing account ID, total value, token balances, and market prices.
 */
```

### getFormattedPortfolio
```javascript
/**
 * Asynchronously gets the formatted portfolio based on the provided agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime information for the agent.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio information.
 */
```

## Interfaces

### TransferContent
```javascript
/**
 * Interface representing the transfer of content.
 * Extends Content interface.
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount being transferred.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### NearToken
```javascript
/**
 * Interface representing a NEAR Protocol token.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol's native token (NEAR).
 */
```

### WalletPortfolio
```javascript
/**
 * Represents a wallet portfolio that contains the total USD value, total NEAR value (optional), and an array of NearToken objects.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects.
 */
```

## Types

### NearConfig
```javascript
/**
 * Type definition for NearConfig based on the inferred type from nearEnvSchema.
 */
```

## Common Issues & Troubleshooting
# Troubleshooting Guide

## Common issues and their solutions
- **Issue**: Dependency conflicts between packages.
  - **Solution**: Ensure that all package dependencies are compatible with each other. You may need to update or downgrade certain packages to resolve conflicts.

- **Issue**: Missing or incorrect NEAR wallet credentials.
  - **Solution**: Check that the NEAR wallet credentials are properly configured in the runtime. If not, update the credentials accordingly.

## Error messages and their meaning
- **Error**: `Error: NEAR wallet credentials are not configured`
  - **Meaning**: The NEAR wallet credentials are missing or incorrect, preventing the method from connecting to the wallet.

## Debugging tips
- Use console.log statements to track the flow of the code and identify any potential issues.
- Set breakpoints in the code using a debugger to pause execution and inspect variables at specific points.

## Configuration problems
- Ensure that all required configurations, such as package dependencies and NEAR wallet credentials, are correctly set up in the runtime.

## Compatibility issues
- Verify that all packages and dependencies are compatible with each other to prevent conflicts during runtime execution.

## Performance optimization
- Use asynchronous programming techniques, such as Promises, to improve the overall efficiency and responsiveness of the application.

## FAQ section
**Q**: How can I update package dependencies to resolve conflicts?
**A**: Use the npm update command to automatically update packages to their latest compatible versions.

**Q**: What should I do if I encounter a NEAR wallet configuration error?
**A**: Double-check the NEAR wallet credentials in the runtime and update them if necessary to resolve the error.
