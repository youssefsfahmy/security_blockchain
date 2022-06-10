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

  const newPatientData = JSON.stringify(req.body.newPatient);

  const encryptedPatientData = await symmetricEncrypt(
    newPatientData,
    symmetricKey
  );

  const confidentialityEncryption = await publicEncrypt(
    publicKeyAuth,
    symmetricKey
  );

  const nonrepudiationEncryption = await sign(
    privateKeydr,
    confidentialityEncryption
  );

  const sentData = {
    doctorid: req.body.doctorid,
    encryptedPatientData,
    encryptedKey: confidentialityEncryption.toString("base64"),
    signature: nonrepudiationEncryption.toString("base64"),
  };

  res.send(sentData);
};

const addNewVisit = async (req, res) => {
  const publicKeyAuth = await getPublicKey(999);
  const symmetricKey = await getSymmetricKey(req.body.doctorid);
  const privateKeydr = await getPrivateKey(req.body.doctorid);

  const newVisitData = JSON.stringify(req.body.newVisit);

  const encryptedVisitData = await symmetricEncrypt(newVisitData, symmetricKey);

  const confidentialityEncryption = await publicEncrypt(
    publicKeyAuth,
    symmetricKey
  );

  const nonrepudiationEncryption = await sign(
    privateKeydr,
    confidentialityEncryption
  );

  const sentData = {
    doctorid: req.body.doctorid,
    encryptedVisitData,
    encryptedKey: confidentialityEncryption.toString("base64"),
    signature: nonrepudiationEncryption.toString("base64"),
  };

  res.send(sentData);
};

const getPatientRequest = async (req, res) => {
  const publicKeyAuth = await getPublicKey(999);
  const symmetricKey = await getSymmetricKey(req.body.doctorid);
  const privateKeydr = await getPrivateKey(req.body.doctorid);

  const requestData = JSON.stringify(req.body.request);

  const encryptedrequestData = await symmetricEncrypt(
    requestData,
    symmetricKey
  );

  const confidentialityEncryption = await publicEncrypt(
    publicKeyAuth,
    symmetricKey
  );

  const nonrepudiationEncryption = await sign(
    privateKeydr,
    confidentialityEncryption
  );

  const sentData = {
    doctorid: req.body.doctorid,
    encryptedrequestData,
    encryptedKey: confidentialityEncryption.toString("base64"),
    signature: nonrepudiationEncryption.toString("base64"),
  };

  res.send(sentData);
};

const decryptRecievedData = async (req, res) => {
  try {
    const symmetricKey = await getSymmetricKey(req.body.doctorid);
    const visitArray = req.body.visits;
    let decryptedVisitArray = [];

    for (let index = 0; index < visitArray.length; index++) {
      let decryptedvisit = await symmetricDecrypt(
        visitArray[index],
        symmetricKey
      );

      decryptedVisitArray.push(JSON.parse(decryptedvisit));
    }

    res.send(decryptedVisitArray);
  } catch (error) {}
};

module.exports = {
  addNewPatient,
  addNewVisit,
  getPatientRequest,
  decryptRecievedData,
};
