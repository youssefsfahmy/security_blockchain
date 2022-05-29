const { add } = require("nodemon/lib/rules");
const {
  newPatientBlock,
  newVisitBlock,
  getPatient,
} = require("./blockchain.controller");
const {
  getPublicKey,
  publicEncrypt,
  getSymmetricKey,
  getPrivateKey,
  symmetricEncrypt,
  sign,
  getPrivateKeyAuth,
  verify,
  privateDecrypt,
  symmetricDecrypt,
} = require("./crypto.controller");
const { getPatientRequest } = require("./doctors.controller");

const verifyNewPatient = async (req, res) => {
  try {
    signature = req.body.signature;
    encryptedKey = req.body.encryptedKey;
    encryptedPatientData = req.body.encryptedPatientData;
    doctorid = req.body.doctorid;

    const publicKeyDoctor = await getPublicKey(doctorid);
    const privateKeyAuth = await getPrivateKeyAuth();

    const verified = await verify(publicKeyDoctor, signature, encryptedKey);

    if (!verified) {
      res.send({ error: "YOU ARE NOT THE DOCTOR YA KADAB" });
    } else {
      const symmetricKey = await privateDecrypt(privateKeyAuth, encryptedKey);

      const patientData = await symmetricDecrypt(
        encryptedPatientData,
        symmetricKey
      );

      const block = {
        signature,
        encryptedKey,
        encryptedPatientData,
        doctorid,
      };
      await newPatientBlock(block, JSON.parse(patientData).nationalid);
      res.send(patientData);
    }
  } catch (err) {
    res.send(err);
  }
};

const verifyNewVisit = async (req, res) => {
  try {
    signature = req.body.signature;
    encryptedKey = req.body.encryptedKey;
    encryptedVisitData = req.body.encryptedVisitData;
    doctorid = req.body.doctorid;

    const publicKeyDoctor = await getPublicKey(doctorid);
    const privateKeyAuth = await getPrivateKeyAuth();

    const verified = await verify(publicKeyDoctor, signature, encryptedKey);

    if (!verified) {
      res.send({ error: "YOU ARE NOT THE DOCTOR YA KADAB" });
    } else {
      const symmetricKey = await privateDecrypt(privateKeyAuth, encryptedKey);

      const VisitData = await symmetricDecrypt(
        encryptedVisitData,
        symmetricKey
      );

      const block = {
        signature,
        encryptedKey,
        encryptedVisitData,
        doctorid,
      };
      await newVisitBlock(block, JSON.parse(VisitData).nationalid, res);
      res.send(VisitData);
    }
  } catch (err) {
    res.send(err);
  }
};

const verifyRequest = async (req, res) => {
  try {
    signature = req.body.signature;
    encryptedKey = req.body.encryptedKey;
    encryptedRequest = req.body.encryptedrequestData;
    doctorid = req.body.doctorid;

    const publicKeyDoctor = await getPublicKey(doctorid);
    const privateKeyAuth = await getPrivateKeyAuth();

    const verified = await verify(publicKeyDoctor, signature, encryptedKey);
    if (!verified) {
      res.send({ error: "YOU ARE NOT THE DOCTOR YA KADAB" });
    } else {
      const symmetricKey = await privateDecrypt(privateKeyAuth, encryptedKey);

      const requestData = await symmetricDecrypt(
        encryptedRequest,
        symmetricKey
      );
      console.log(JSON.parse(requestData).patientNationalid);
      visitArr = await getPatient(
        JSON.parse(requestData).patientNationalid,
        req.body.doctorid,
        res
      );
      console.log("visitArr");
      const block = {
        signature,
        encryptedKey,
        encryptedRequest,
        doctorid,
      };
      // await newVisitBlock(
      //   block,
      //   JSON.parse(requestData).patientNationalid,
      //   res
      // );

      res.send(visitArr);
    }
  } catch (err) {
    res.send(err);
  }
};
module.exports = { verifyNewPatient, verifyNewVisit, verifyRequest };
