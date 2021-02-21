const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledContract = require("./compile");

const bytecode = compiledContract.evm.bytecode.object;
const abi = compiledContract.abi;

const mnemonicPhrase =
  "carbon tower feel armed margin furnace nothing false course nature glance coyote";

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/190d2e2670274a3183a86804ddee1ee3",
});

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("fnara 123123", accounts[0]);

    const inbox = await new web3.eth.Contract(abi)
      .deploy({
        data: bytecode,
        arguments: ["hi..."],
      })
      .send({
        gas: "1000000",
        from: accounts[0],
      });
    console.log("Adress =>>", inbox.options.address);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

deploy();
