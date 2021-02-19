const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const src = fs.readFileSync(inboxPath, "utf8");

var input = {
  language: "Solidity",
  sources: {
    "inbox.sol": {
      content: src,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "inbox.sol"
]["Inbox"];
