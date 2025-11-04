require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    didlab: {
      url: process.env.RPC_URL || "https://eth.didlab.org",
      chainId: 252501,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      timeout: 120000,
      gas: "auto",
      gasPrice: 1000000000, // 1 gwei
    },
  },
};