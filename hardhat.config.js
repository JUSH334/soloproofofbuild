require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    didlab: {
      url: "https://eth.blockchain.didlab.org",
      chainId: 252501,
      accounts: ["0xcde553ec19806847ac8794493da93fb6549b937b815609c499a5faa6309a4cc8"],
    },
  },
};
