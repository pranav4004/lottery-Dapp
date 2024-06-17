# Lottery DApp

Welcome to the Lottery Decentralized Application (DApp)! This project is a blockchain-based lottery system where users can enter a lottery by sending a certain amount of Ether. The contract is deployed on the Sepolia test network. This README file will guide you through the setup and usage of the DApp.

## Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contract Deployment](#contract-deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Lottery DApp allows users to participate in a lottery by sending Ether to a smart contract. After a specified period, a random winner is selected and awarded the total Ether collected. The application frontend is built with React and Next.js, and the smart contract is written in Solidity.

## Directory Structure

```
/lottery-dapp
├── public
│   └── ...
├── src
│   ├── components
│   ├── pages
│   ├── utils
│   └── ...
├── styles
│   └── globals.css
│─ Lottery.sol
├── README.md
└── ...
```

- **public**: Contains public assets.
- **src**: Contains the source code for the frontend.
- **styles**: Global CSS styles.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework for server-side rendering and static site generation.
- **Solidity**: Programming language for writing smart contracts.
- **Ethereum**: Decentralized platform for running smart contracts.
- **Sepolia**: Ethereum test network for deploying and testing contracts.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/lottery-dapp.git
cd lottery-dapp
```

2. **Install dependencies:**

```bash
npm install
```



## Usage

1. **Run the development server:**

```bash
npm run dev
```

2. **Open your browser and navigate to:**

```plaintext
http://localhost:3000
```

Here, you can interact with the Lottery DApp, enter the lottery, and check for the winner.

## Contract Deployment

To deploy the smart contract to the Sepolia network, follow these steps:

1. **Compile the contract:**

Use a tool like `solc` or the Solidity compiler built into Remix to compile `Lottery.sol`.

2. **Deploy the contract:**

Use a tool like `truffle` or `hardhat` to deploy the contract. Ensure you have configured the deployment script with your Sepolia network settings.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
