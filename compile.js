const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const src = fs.readFileSync(inboxPath, "utf8");

console.log(solc.compile(src, 1));
