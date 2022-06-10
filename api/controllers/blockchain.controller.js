const fs = require("fs").promises;

const res = require("express/lib/response");
const authjson = require("../../models/auth.json");

const { createHash, checkHash } = require("./hash.controller");

var callback = function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return;
  }
  console.log("JSON file has been saved.");
};
const newPatientBlock = async (block, patientNationalid, res) => {
  counter = authjson.counter;

  for (let index = counter - 1; 0 <= index; index--) {
    const data = await fs.readFile(
      `blockchain/blockchain_${index}.json`,
      "utf8"
    );

    obj = JSON.parse(data); //now it an object

    if (obj.patientNationalid == patientNationalid) {
      res.send("Patient already exists");
      return;
    }
  }

  if (counter == 0) {
    const hash = createHash(JSON.stringify(block));

    const previosHash = "0";

    const newBlock = JSON.stringify({
      patientNationalid,
      hash,
      previosHash,
      block,
    });

    fs.writeFile(
      `blockchain/blockchain_${counter}.json`,
      newBlock,
      "utf8",
      callback
    );
    authjson.counter = authjson.counter + 1;

    await fs.writeFile(
      "models/auth.json",
      JSON.stringify(authjson),
      "utf8",
      callback
    );
  } else {
    const hash = createHash(JSON.stringify(block));

    const previosHash = await getHash(counter - 1);

    const newBlock = JSON.stringify({
      patientNationalid,
      hash,
      previosHash,
      block,
    });

    fs.writeFile(
      `blockchain/blockchain_${counter}.json`,
      newBlock,
      "utf8",
      callback
    );
    authjson.counter = authjson.counter + 1;

    await fs.writeFile(
      "models/auth.json",
      JSON.stringify(authjson),
      "utf8",
      callback
    );
  }

  return true;
};

const newVisitBlock = async (block, patientNationalid, res) => {
  counter = authjson.counter;
  let prevBlockId = -1;
  for (let index = counter - 1; 0 <= index; index--) {
    const data = await fs.readFile(
      `blockchain/blockchain_${index}.json`,
      "utf8"
    );

    obj = JSON.parse(data); //now it an object

    if (obj.patientNationalid == patientNationalid) {
      prevBlockId = index;
      break;
    }
  }

  if (prevBlockId == -1) {
    res.send("error yahbal");
  } else {
    const hash = createHash(JSON.stringify(block));

    const previosHash = await getHash(counter - 1);
    const pointerHash = await getHash(prevBlockId);
    const pointer = prevBlockId;

    const newBlock = JSON.stringify({
      patientNationalid,
      hash,
      previosHash,
      pointerHash,
      pointer,
      block,
    });

    fs.writeFile(
      `blockchain/blockchain_${counter}.json`,
      newBlock,
      "utf8",
      callback
    );
    authjson.counter = authjson.counter + 1;

    await fs.writeFile(
      "models/auth.json",
      JSON.stringify(authjson),
      "utf8",
      callback
    );
  }

  return true;
};
async function getHash(counter) {
  const data = await fs.readFile(
    `blockchain/blockchain_${counter}.json`,
    "utf8"
  );
  obj = JSON.parse(data); //now it an object

  return obj.hash;
}
async function getPatient(patientNationalid, doctorid, res) {
  counter = authjson.counter;
  const visitArr = [];
  let foundVisit = null;

  for (let index = counter - 1; 0 <= index; index--) {
    const data = await fs.readFile(
      `blockchain/blockchain_${index}.json`,
      "utf8"
    );

    obj = JSON.parse(data); //now it an object

    if (obj.patientNationalid == patientNationalid) {
      if (doctorid != obj.block.doctorid) {
        res.send("ENTA MSH DOCTORYYYYY");
      }
      foundVisit = obj;
      break;
    }
  }
  flag = true;
  while (flag) {
    if (foundVisit.pointer == null) {
      visitArr.push(foundVisit.block.encryptedPatientData);
      flag = false;
      break;
    } else {
      visitArr.push(foundVisit.block.encryptedVisitData);

      const data = await fs.readFile(
        `blockchain/blockchain_${foundVisit.pointer}.json`,
        "utf8"
      );
      const hashPointer = foundVisit.pointerHash;

      foundVisit = JSON.parse(data); //now it an object
      isValid = checkHash(JSON.stringify(foundVisit.block), foundVisit.hash);

      if (!isValid || foundVisit.hash != hashPointer) {
        res.send("Breach");

        return null;
      }
    }
  }

  return visitArr;
}
async function checkAllBlockchain(req, res, next) {
  counter = authjson.counter;
  let prevHash = null;
  for (let index = counter - 1; 0 <= index; index--) {
    const data = await fs.readFile(
      `blockchain/blockchain_${index}.json`,
      "utf8"
    );
    const hashData = JSON.parse(data).hash;
    const correctData = checkHash(
      JSON.stringify(JSON.parse(data).block),
      hashData
    );

    if (!correctData) {
      res.send("BREACH current hash");
    }

    if (prevHash != null) {
      if (hashData != prevHash) {
        res.send("BREACH prev hash");
      }
    }
    prevHash = JSON.parse(data).prevHash;
  }

  res.send("Tmaaaaaam ya fandem");
}

module.exports = {
  newPatientBlock,
  newVisitBlock,
  getPatient,
  checkAllBlockchain,
};
