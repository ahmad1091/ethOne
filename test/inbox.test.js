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

  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: byecode,
      arguments: ["hi--there"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "hi--there");
  });

  it("can set new msg", async () => {
    await inbox.methods.setMessage("ethOne").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "ethOne");
  });
});
