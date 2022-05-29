const crypto = require("crypto");
const { json } = require("express/lib/response");
const fs = require("fs").promises;
const doctorjson = require("../../models/doctors.json");
const authjson = require("../../models/auth.json");

const publishedjson = require("../../models/publishedkeys.json");
// const doctorjson = require("../../models/doctors.json");
// const authjson = require("../../models/auth.json");

// const publishedjson = require("../../models/publishedkeys.json");

// // The `generateKeyPairSync` method accepts two arguments:
// // 1. The type ok keys we want, which in this case is "rsa"
// // 2. An object with the properties of the key
// // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
// //   // The standard secure default length for RSA keys is 2048 bits
// //   modulusLength: 2048,
// // });

// const privateKeyS = authjson.privatekey;
// const publicKeyS = publishedjson[0].publickey;
// console.log(publicKeyS);
// // use the public and private keys
// // ...
// console.log(privateKeyS);
// const data = "bf3c199c2470cb477d907b1e0917c17b";

// const privateKey = crypto.createPrivateKey(
//   "-----BEGIN RSA PRIVATE KEY-----\nMIICWgIBAAKBgH8N650I3W0SfrEGsweufOjbheAih8WbhmfFSsMwPBCCnNpnT788\nwVb3CDJZ7g5CqHfUA8LNtw/8/8zfUMfefHSpGP2Js9o19mnYgWBNJG5Q0AdxjIvo\nlw8ENhknDQe8NrpT0eiKatQuKDVrHZdt77X/f+1x514W1XF3KsgCH2MrAgMBAAEC\ngYAT/9Dyqw6PuLWQkAlmUCUBUmzEVysgA9coRnn6N4F859Jg3ppC9AFK+x+jLVy3\nie6SziC5bUA/mAd77Dr++xqD2W5WtMhYHy1uDLyqp9JmPDCFF8L371zgKhgkWSk+\nilF+2Pcnnh2UMnKxfZN3wkFEHAMMSsWLBfJ9U+ax8XmZYQJBAMjr7qbxqLcaD67j\nQS4oj7K8NmokTBNsPUczM+t/WFYwSg7YWziC5k7yT39nJ1aMB5qjlQHCKMz4Erfs\npuzXzC0CQQCh4jXRnA3Fy6VASBNL7IgxtnoqpOggF0ayLxszE5lGD72I0jqzjSUp\nMHCvI2VUA4kjd5XvpzLR0WCS3xaoAIu3AkAVaIYyRZeLgvxezxoX1/yPt9w4bQuq\nGiNhXcRPeG8qJ9UMReNaXyA5EzqDQbOAVkVNJdbvrAd654ffDxkuLUQ1AkBTA1RD\n27l4T5i7IPq8OVwR2hhFm/Do2+bF4sAY7hjwQ4wXCG9PubZvq8ZtGUKR1YpSpLU/\ngsbdr3fNeRb+KeF7AkB3lWnWXFec9DSPVKyQ9Xr7BWqdrV1zyOv3RyuN+OlmycmD\ndwb3y1l9HZIVUoLZT9hFKRRaAvEYUIBampfIX23V\n-----END RSA PRIVATE KEY-----"
// );
// const publicKey = crypto.createPublicKey(
//   "-----BEGIN PUBLIC KEY-----\nMIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgH8N650I3W0SfrEGsweufOjbheAi\nh8WbhmfFSsMwPBCCnNpnT788wVb3CDJZ7g5CqHfUA8LNtw/8/8zfUMfefHSpGP2J\ns9o19mnYgWBNJG5Q0AdxjIvolw8ENhknDQe8NrpT0eiKatQuKDVrHZdt77X/f+1x\n514W1XF3KsgCH2MrAgMBAAE=\n-----END PUBLIC KEY-----",
//   "bf3c199c2470cb477d907b1e0917c17b"
// );
// publicKey.export({ format: "pem", type: "pkcs1" });
// console.log(publicKey);
// privateKey.export({ format: "pem", type: "pkcs1" });

// const encryptedData = crypto.publicEncrypt(
//   {
//     key: publicKey,
//     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//     oaepHash: "sha256",
//   },
//   // We convert the data string to a buffer using `Buffer.from`
//   Buffer.from(data)
// );

// // The encrypted data is in the form of bytes, so we print it in base64 format
// // so that it's displayed in a more readable form
// console.log("encypted data: ", encryptedData.toString("base64"));

// const decryptedData = crypto.privateDecrypt(
//   {
//     key: privateKey,
//     // In order to decrypt the data, we need to specify the
//     // same hashing function and padding scheme that we used to
//     // encrypt the data in the previous step
//     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//     oaepHash: "sha256",
//   },
//   encryptedData
// );

// // The decrypted data is of the Buffer type, which we can convert to a
// // string to reveal the original data
// console.log("decrypted data: ", decryptedData.toString());

//   // Create some sample data that we want to sign
// const verifiableData = "this need to be verified";

// // The signature method takes the data we want to sign, the
// // hashing algorithm, and the padding scheme, and generates
// // a signature in the form of bytes
// const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
//   key: privateKey,
//   padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
// });

// console.log(signature.toString("base64"));

// // To verify the data, we provide the same hashing algorithm and
// // padding scheme we provided to generate the signature, along
// // with the signature itself, the data that we want to
// // verify against the signature, and the public key
// const isVerified = crypto.verify(
//   "sha256",
//   Buffer.from(verifiableData),
//   {
//     key: publicKey,
//     padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
//   },
//   signature
// );

// // isVerified should be `true` if the signature is valid
// console.log("signature verified: ", isVerified);
//-------------------------------------------------SYMMETRIC ENCRYPTION-------------------------------------------------------------------------

// const ENC = "bf3c199c2470cb477d907b1e0917c17b";
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

// const encrypted_key = symmetricEncrypt("ANAN" , "bf3c199c2470cb477d907b1e0917c17b");
// console.log(encrypted_key);
// const decrypted_key = symmetricDecrypt(encrypted_key);
// console.log(decrypted_key);
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

const main = async () => {
  const data = "bf3c199c2470cb477d907b1e0917c17b";
  const privateKeyS = authjson.privatekey;
  const publicKeyS = publishedjson[0].publickey;

  const encryptedData = publicEncrypt(publicKeyS, data);
  const encryptedDataS = encryptedData.toString("base64");
  const decryptedData = privateDecrypt(privateKeyS, encryptedDataS);
  console.log("decrypted data: ", decryptedData.toString());
};

// main();

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
