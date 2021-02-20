const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledContract = require("./compile");

const bytecode = compiledContract.evm.bytecode.object;
const abi = compiledContract.abi;

const mnemonicPhrase =
  "carbon tower feel armed margin furnace nothing false course nature glance coyote";
// const provider = new HDWalletProvider(
//   "carbon tower feel armed margin furnace nothing false course nature glance coyote",
//   "https://rinkeby.infura.io/v3/190d2e2670274a3183a86804ddee1ee3"
// );
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/190d2e2670274a3183a86804ddee1ee3",
});

const web3 = new Web3(provider);

const deploy = async () => {
  // const accounts = await web3.eth.getAccounts();
  // console.log("fnara 123123", accounts[0]);
  // const inbox = await new web3.eth.Contract(abi)
  //   .deploy({
  //     data: bytecode,
  //     arguments: ["hi..."],
  //   })
  //   .send({
  //     form: accounts[0],
  //     gas: "1000000",
  //   });

  web3.eth.getAccounts().then((accounts) => {
    console.log("fnara 123123", accounts[0]);
    new web3.eth.Contract(abi)
      .deploy({
        data: bytecode,
        arguments: ["hi..."],
      })
      .send({
        form: accounts[0],
        gas: "1000000",
      })
      .then((result) => {
        console.log("address::::", result.options.address);
      });
  });
};

deploy();
