const HDWalletProvider = require('@truffle/hdwallet-provider');

// added for typescript
// require("ts-node/register");


module.exports = {
  // this is required by truffle to find any typescript ts test files
  // test_file_extension_regexp: /.*\.ts$/,

  networks: {
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
     gas: 6712390,
    },
    ropsten: {
      /* provider: function () {
        const secret = require("./secret.json");
        return new HDWalletProvider(secret.mnemonic, `https://ropsten.infura.io/v3/${secret.infuraKey[1]}`, 2);
      }, */
      provider: function () {
        const secret = require("./secret.json");
        return new HDWalletProvider(
          secret.mnemonic,//secret.alchemy, 
          'wss://eth-ropsten.ws.alchemyapi.io/v2/2vcXaK3xR2xUx2XYhEVzfpX7maV4uHlp');
      },
      //chainId: 3,
      network_id: 3,
      gas: 7721975,
      skipDryRun: true,
      gasPrice: 23000000000,
      from: '0xC6561dF9180a8863fA9a16aB376eFbca17166CF4'
    },
    live: {
      provider: function () {
        const secret = require("./secret.json");
        return new HDWalletProvider(secret.mnemonic, `https://mainnet.infura.io/v3/${secret.infuraKey}`);
      },
      chainId: 1,
      network_id: 1,
      gas: 6721975,
      skipDryRun: true,
      gasPrice: 75000000000,
    },
  },
  mocha: {
    timeout: 1200000
  },
  plugins: ["solidity-coverage", 'truffle-plugin-verify'],
  api_keys: {
    etherscan: 'YWGA9IG8T37IZ5JX4UKKNNF8E3W8XKGCD1'
  },
  compilers: {
    solc: {
      //version: "0.5.16",
      version: "0.7.5",
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       },
       //evmVersion: "istanbul", // https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2342
      }
    }
  }
}

/* stable version
Truffle v5.0.0 (core: 5.0.0)
Solidity - 0.5.16 (solc-js)
Node v10.13.0*/

/* latest december 2020 version used
Truffle v5.1.58 (core: 5.1.58)
Solidity - 0.7.5 (solc-js)
Node v10.13.0
Web3.js v1.2.9 */