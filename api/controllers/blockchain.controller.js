const fs = require("fs").promises;

var callback = function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }

  console.log("JSON file has been saved.");
};

async function getBlockChain() {
  const data = await fs.readFile("models/blockchain.json", "utf8");
  obj = JSON.parse(data); //now it an object

  return obj;
}

async function setBlockChain(data) {
  const data = await fs.readFile("models/blockchain.json", "utf8");
  await fs.writeFile("models/blockchain.json", json, "utf8", callback);
  return true;
}

async function main() {
  const x = await getBlockChain();
  console.log("the data:", x);
}

main();
