const crypto = require("crypto");
const { json } = require("express/lib/response");
const fs = require("fs").promises;

const doctorjson = require("../../models/doctors.json");
const authjson = require("../../models/auth.json");

const publishedjson = require("../../models/publishedkeys.json");

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key
// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//   // The standard secure default length for RSA keys is 2048 bits
//   modulusLength: 2048,
// });

const privateKeyS = authjson.privatekey;
const publicKeyS = publishedjson[0].publickey;
// use the public and private keys
// ...
const data = "bf3c199c2470cb477d907b1e0917c17b";

const privateKey = crypto.createPrivateKey(
  "-----BEGIN RSA PRIVATE KEY-----\nMIICWgIBAAKBgH8N650I3W0SfrEGsweufOjbheAih8WbhmfFSsMwPBCCnNpnT788\nwVb3CDJZ7g5CqHfUA8LNtw/8/8zfUMfefHSpGP2Js9o19mnYgWBNJG5Q0AdxjIvo\nlw8ENhknDQe8NrpT0eiKatQuKDVrHZdt77X/f+1x514W1XF3KsgCH2MrAgMBAAEC\ngYAT/9Dyqw6PuLWQkAlmUCUBUmzEVysgA9coRnn6N4F859Jg3ppC9AFK+x+jLVy3\nie6SziC5bUA/mAd77Dr++xqD2W5WtMhYHy1uDLyqp9JmPDCFF8L371zgKhgkWSk+\nilF+2Pcnnh2UMnKxfZN3wkFEHAMMSsWLBfJ9U+ax8XmZYQJBAMjr7qbxqLcaD67j\nQS4oj7K8NmokTBNsPUczM+t/WFYwSg7YWziC5k7yT39nJ1aMB5qjlQHCKMz4Erfs\npuzXzC0CQQCh4jXRnA3Fy6VASBNL7IgxtnoqpOggF0ayLxszE5lGD72I0jqzjSUp\nMHCvI2VUA4kjd5XvpzLR0WCS3xaoAIu3AkAVaIYyRZeLgvxezxoX1/yPt9w4bQuq\nGiNhXcRPeG8qJ9UMReNaXyA5EzqDQbOAVkVNJdbvrAd654ffDxkuLUQ1AkBTA1RD\n27l4T5i7IPq8OVwR2hhFm/Do2+bF4sAY7hjwQ4wXCG9PubZvq8ZtGUKR1YpSpLU/\ngsbdr3fNeRb+KeF7AkB3lWnWXFec9DSPVKyQ9Xr7BWqdrV1zyOv3RyuN+OlmycmD\ndwb3y1l9HZIVUoLZT9hFKRRaAvEYUIBampfIX23V\n-----END RSA PRIVATE KEY-----"
);
privateKey.export({ format: "pem", type: "pkcs1" });

encryptedDataS =
  "IO+OxDDRhTZm8OPP98apmvBfuqUBCV+6Nu19KV75fyjw7u9UuCFNGzOAzh6e4BFtiFuhiB7wJrC7Ivk29EWk0KGpg34JEDt0hRqqJyDAR9hkfUUbEKRagBFbmBBbjID3oFy9XJidorvep2Az+JZhemrEZz3R+K/RR+8farxOZ34=";

const encryptedData = Buffer.from(encryptedDataS, "base64");

const decryptedData = crypto.privateDecrypt(
  {
    key: privateKey,
    // In order to decrypt the data, we need to specify the
    // same hashing function and padding scheme that we used to
    // encrypt the data in the previous step
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  encryptedData
);
console.log("ANA HENAA");

// The decrypted data is of the Buffer type, which we can convert to a
// string to reveal the original data
console.log("decrypted data: ", decryptedData.toString());
