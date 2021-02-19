const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compiledContract = require("../compile");
const web3 = new Web3(ganache.provider());

const byecode = compiledContract.evm.bytecode.object;
const abi = compiledContract.abi;
let accounts;
let inbox;
beforeEach(async () => {
  //get a list of all account
  accounts = await web3.eth.getAccounts();
  //use one of those accounts to deploy
  //the contract
  //   web3.eth.getAccounts().then((accounts) => {
  //     new web3.eth.Contract(abi)
  //       .deploy({
  //         data: byecode,
  //         arguments: ["hi--there"],
  //       })
  //       .send({ from: accounts[1], gas: "1000000" })
  //       .then((res) => {
  //         inbox = res;
  //       });
  //   });

  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: byecode,
      arguments: ["hi--there"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});
// console.log(byecode, abi);
// 'abi',=>[ '0', '1', '2' ]
// 'devdoc',=>[ 'kind', 'methods', 'version' ]
// 'evm',=>[
//   'assembly',
//   'bytecode',
//   'deployedBytecode',
//   'gasEstimates',
//   'legacyAssembly',
//   'methodIdentifiers'
// ]
// 'ewasm',
// 'metadata',
// 'storageLayout',
// 'userdoc'
describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});
