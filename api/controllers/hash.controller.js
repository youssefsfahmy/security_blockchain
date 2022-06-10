var crypto = require("crypto");

const createHash = (data) => {
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return hash;
};

const checkHash = (data, hash) => {
  const hash2 = crypto.createHash("sha256").update(data).digest("hex");

  return hash == hash2;
};

module.exports = { createHash, checkHash };
