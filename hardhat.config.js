require("@nomicfoundation/hardhat-toolbox");
const { mnemonic } = require('./.secrets.json')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.10",
      },
      {
        version: "0.8.9",
      },
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        }
      }]
  },
  networks: {
    hardhat: {
        gas: 19000000,
        allowUnlimitedContractSize: true,
        timeout: 1800000
    },
    goerli: {
        url: "https://goerli.infura.io/v3/c4174820658a4db9a6e5d54efec43ede",
        chainId: 5,
        accounts: { mnemonic: mnemonic },
        gas: 1200000000,
        blockGasLimit: 3000000000,
        allowUnlimitedContractSize: true,
        timeout: 1800000
    },
    matic: {
        url: "https://rpc-mainnet.maticvigil.com",
        chainId: 137,
        gasPrice: "auto",
        allowUnlimitedContractSize: true,
        timeout: 1800000,
        accounts: { mnemonic: mnemonic },
    },
    goerliBase: {
      url: "https://base-goerli.public.blastapi.io",
      chainId: 84531,
      gasPrice: "auto",
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      accounts: { mnemonic: mnemonic },
  },
  base: {
    url: "https://base.meowrpc.com",
    chainId: 8453,
    gasPrice: "auto",
    allowUnlimitedContractSize: true,
    timeout: 1800000,
    accounts: { mnemonic: mnemonic },
},
},
};
