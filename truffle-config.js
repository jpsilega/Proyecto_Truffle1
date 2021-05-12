/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

//const NonceSubprovider = require("@trufflesuite/web3-provider-engine/subproviders/nonce-tracker");

const WalletProvider = require('@truffle/hdwallet-provider');

const HDWalletProvider = require('truffle-hdwallet-provider-privkey');




  const privateKeys = [  
    '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f',    
    '0xe59ece47394f84e2dd0caaeb217e865d0ba51aa46f2c3497ee65a973a1c16bb2',
    '0x25fbebf95f9e8f7b983744f6a40b9e3f2e9e78217fadc80f471a42aba5c0c5b3',    
    '0x44b6231c400531f117b69969de7f6b67cec0105c09f3b4666d659df64bcce118',
    '0x9b3ca5680aff1101d5de8924a124830591283fe2a140215ea44d5065d3b9187e',   
    '0xb64bcdf58cc9ebbd6bc07539b2090f821bf02bb29decb1d8682b4f5d8ef2ccda',         
    '0x64967ee31e2b2b597783418ee2df16eba9606daeb2efd6968fe6b348f0a2af6c',    
    '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3',
    '0xcd9c3d8c9057f26eaf6f49b12f4778cf02232616e8cbfe43e858b0eb9e7e4399',
    '0x852382d390c471b17c558f7b6aa0215b035833135a5daa661c5366c91773998e'
    
    ];



 // const privateKeyProvider = new HDWalletProvider(privateKeys, 'http://10.20.32.48:8545', 0, 11 )
 

//artefact latin ladder vital nose tell omit question oxygen opera frozen whisper
 const mnemonic = "gesture rather obey video awake genuine patient base soon parrot upset lounge";

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    
    lacchain2: {        
      provider: () =>
        new WalletProvider({
          privateKeys,
          providerOrUrl: "http://10.20.32.48:8545",
          numberOfAddresses: 10,
          shareNonce: true,
          derivationPath: "m/44'/60'/0'/0/",
          pollingInterval: 15e4  
        }),      
      network_id: '*',          
      networkCheckTimeout : 10e5,  
      timeoutBlocks: 300, 
      deploymentPollingInterval: 15e4, 
      disableConfirmationListener: true    
    }, 

    coverage: {
      url: 'http://localhost:7545'
    },

    // Another network with more advanced options...
    // advanced: {
      // port: 8777,             // Custom port
      // network_id: 1342,       // Custom network
      // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      // from: <address>,        // Account to send txs from (default: accounts[0])
      // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },

    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () => new WalletProvider(privateKeys, `https://ropsten.infura.io/v3/e71400c964fb4e41b7fd6453db88fbe6`),
      network_id: 3,       // Ropsten's id
      gas: 6000000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

     kovan: {
      provider: () => new WalletProvider(mnemonic, 'https://kovan.infura.io/v3/0817e2b2ca104c9aa8528bfc78879a31'),
      network_id: 42,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    // Useful for private networks
    // private: {
      // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
      // network_id: 2111,   // This network is yours, in the cloud.
      // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
    enableTimeouts: false,
  //  before_timeout: 220000  // <--- unidades en ms
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "pragma",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 100
        },
      //  evmVersion: "byzantium"
       }
    }
  },
  plugins: ["solidity-coverage"],
  skipFiles: ['Address.sol',
              'Context.sol',
              'IERC20.sol',
              'ERC20.sol',
              'Migrations.sol',
              'Owner.sol',
              'SafeMath.sol' ]
}
