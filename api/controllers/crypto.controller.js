const crypto = require("crypto");
const { json } = require("express/lib/response");
const fs = require("fs").promises;
const authjson = require("../../models/auth.json");
const publishedjson = require("../../models/publishedkeys.json");

//-------------------------------------------------SYMMETRIC ENCRYPTION-------------------------------------------------------------------------

const IV = "5183666c72eec9e4";
const ALGO = "aes-256-cbc";

const symmetricEncrypt = async (text, ENC) => {
  let cipher = crypto.createCipheriv(ALGO, ENC, IV);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

const symmetricDecrypt = async (text, ENC) => {
  let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
  let decrypted = decipher.update(text, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

//-------------------------------------------------ASSYMETRIC ENCRYPTION--------------------------------------------------------------------------

const publicEncrypt = (publicKeyS, data) => {
  const publicKey = crypto.createPublicKey(publicKeyS, data);
  publicKey.export({ format: "pem", type: "pkcs1" });
  toot = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(data)
  );

  return toot;
};

const privateDecrypt = (privateKeyS, encryptedDataS) => {
  const privateKey = crypto.createPrivateKey(privateKeyS);
  privateKey.export({ format: "pem", type: "pkcs1" });
  const encryptedDataSData = Buffer.from(encryptedDataS, "base64");

  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedDataSData
  );
  return decryptedData;
};

const sign = (privateKey, verifiableData) => {
  const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  });

  return signature;
};

const verify = (publicKey, signature, verifiableData) => {
  const buffverifiableData = Buffer.from(verifiableData, "base64");
  const buffsignature = Buffer.from(signature, "base64");

  const isVerified = crypto.verify(
    "sha256",
    Buffer.from(buffverifiableData),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
    buffsignature
  );
  return isVerified;
};

async function getPublicKey(id) {
  const data = await fs.readFile("models/publishedkeys.json", "utf8");
  obj = JSON.parse(data); //now it an object
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id == id) {
      return obj[i].publickey;
    }
  }
  return null;
}

async function getSymmetricKey(id) {
  const data = await fs.readFile("models/doctors.json", "utf8");
  obj = JSON.parse(data); //now it an object
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id == id) {
      return obj[i].symmetrickey;
    }
  }
  return null;
}

async function getPrivateKey(id) {
  const data = await fs.readFile("models/doctors.json", "utf8");
  obj = JSON.parse(data); //now it an object
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id == id) {
      return obj[i].privatekey;
    }
  }
  return null;
}

async function getPrivateKeyAuth() {
  const data = await fs.readFile("models/auth.json", "utf8");
  obj = JSON.parse(data); //now it an object

  return obj.privatekey;
}

module.exports = {
  getPrivateKeyAuth,
  publicEncrypt,
  privateDecrypt,
  sign,
  verify,
  getPublicKey,
  symmetricDecrypt,
  symmetricEncrypt,
  getSymmetricKey,
  getPrivateKey,
};
