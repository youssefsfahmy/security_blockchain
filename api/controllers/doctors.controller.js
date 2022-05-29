const {
  getPublicKey,
  publicEncrypt,
  getSymmetricKey,
  getPrivateKey,
  symmetricEncrypt,
  sign,
  symmetricDecrypt,
} = require("./crypto.controller");

const addNewPatient = async (req, res) => {
  const publicKeyAuth = await getPublicKey(999);
  const symmetricKey = await getSymmetricKey(req.body.doctorid);
  const privateKeydr = await getPrivateKey(req.body.doctorid);
  console.log("----------------------------------------");
  console.log("Authority public key:", publicKeyAuth);
  console.log("----------------------------------------");

  console.log("Doctor-Auth Symmetric key:", symmetricKey);
  console.log("----------------------------------------");

  console.log("Doctor's private key:", privateKeydr);
  console.log("----------------------------------------");

  const newPatientData = JSON.stringify(req.body.newPatient);
  console.log("----------------------------------------");

  console.log("Visit data in request:", newPatientData);

  const encryptedPatientData = await symmetricEncrypt(
    newPatientData,
    symmetricKey
  );
  console.log("----------------------------------------");
  console.log("Encrypted Visit data:", encryptedPatientData);

  const confidentialityEncryption = await publicEncrypt(
    publicKeyAuth,
    symmetricKey
  );

  console.log("----------------------------------------");
  console.log(
    "Symmetric key encrypted RSA (confidentiality):",
    confidentialityEncryption
  );

  const nonrepudiationEncryption = await sign(
    privateKeydr,
    confidentialityEncryption
  );

  console.log("----------------------------------------");
  console.log(
    "Doctor signature (RSA Private key for nonrepudiation): ",
    encryptedPatientData
  );

  const sentData = {
    doctorid: req.body.doctorid,
    encryptedPatientData,
    encryptedKey: confidentialityEncryption.toString("base64"),
    signature: nonrepudiationEncryption.toString("base64"),
  };

  console.log(sentData);
  res.send(sentData);
};

const addNewVisit = async (req, res) => {
  const publicKeyAuth = await getPublicKey(999);
  const symmetricKey = await getSymmetricKey(req.body.doctorid);
  const privateKeydr = await getPrivateKey(req.body.doctorid);
  console.log("----------------------------------------");
  console.log("Authority public key:", publicKeyAuth);
  console.log("----------------------------------------");
  console.log("Doctor-Auth Symmetric key:", symmetricKey);
  console.log("----------------------------------------");
  console.log("Doctor's private key:", privateKeydr);
  console.log("----------------------------------------");
  const newVisitData = JSON.stringify(req.body.newVisit);
  console.log("----------------------------------------");
  console.log("Visit data in request:", newVisitData);
  const encryptedVisitData = await symmetricEncrypt(newVisitData, symmetricKey);
  console.log("----------------------------------------");
  console.log("Encrypted Visit data:", encryptedVisitData);
  const confidentialityEncryption = await publicEncrypt(
    publicKeyAuth,
    symmetricKey
  );
  console.log("----------------------------------------");
  console.log(
    "Symmetric key encrypted RSA (confidentiality):",
    confidentialityEncryption
  );
  const nonrepudiationEncryption = await sign(
    privateKeydr,
    confidentialityEncryption
  );
  console.log("----------------------------------------");
  console.log(
    "Doctor signature (RSA Private key for nonrepudiation): ",
    encryptedVisitData
  );
  const sentData = {
    doctorid: req.body.doctorid,
    encryptedVisitData,
    encryptedKey: confidentialityEncryption.toString("base64"),
    signature: nonrepudiationEncryption.toString("base64"),
  };
  console.log(sentData);
  res.send(sentData);
};

const getPatientRequest = async (req, res) => {
  const publicKeyAuth = await getPublicKey(999);
  const symmetricKey = await getSymmetricKey(req.body.doctorid);
  const privateKeydr = await getPrivateKey(req.body.doctorid);
  console.log("----------------------------------------");
  console.log("Authority public key:", publicKeyAuth);
  console.log("----------------------------------------");
  console.log("Doctor-Auth Symmetric key:", symmetricKey);
  console.log("----------------------------------------");
  console.log("Doctor's private key:", privateKeydr);
  console.log("----------------------------------------");
  const requestData = JSON.stringify(req.body.request);
  console.log("----------------------------------------");
  console.log("Visit data in request:", requestData);
  const encryptedrequestData = await symmetricEncrypt(
    requestData,
    symmetricKey
  );
  console.log("----------------------------------------");
  console.log("Encrypted Visit data:", encryptedrequestData);
  const confidentialityEncryption = await publicEncrypt(
    publicKeyAuth,
    symmetricKey
  );
  console.log("----------------------------------------");
  console.log(
    "Symmetric key encrypted RSA (confidentiality):",
    confidentialityEncryption
  );
  const nonrepudiationEncryption = await sign(
    privateKeydr,
    confidentialityEncryption
  );
  console.log("----------------------------------------");
  console.log(
    "Doctor signature (RSA Private key for nonrepudiation): ",
    encryptedrequestData
  );
  const sentData = {
    doctorid: req.body.doctorid,
    encryptedrequestData,
    encryptedKey: confidentialityEncryption.toString("base64"),
    signature: nonrepudiationEncryption.toString("base64"),
  };
  console.log(sentData);
  res.send(sentData);
};

const decryptRecievedData = async (req, res) => {
  try {
    const symmetricKey = await getSymmetricKey(req.body.doctorid);
    const visitArray = req.body.visits;
    let decryptedVisitArray = [];
    console.log(symmetricKey);
    console.log(visitArray);
    for (let index = 0; index < visitArray.length; index++) {
      let decryptedvisit = await symmetricDecrypt(
        visitArray[index],
        symmetricKey
      );

      decryptedVisitArray.push(JSON.parse(decryptedvisit));
    }

    res.send(decryptedVisitArray);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewPatient,
  addNewVisit,
  getPatientRequest,
  decryptRecievedData,
};
