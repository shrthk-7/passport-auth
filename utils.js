const crypto = require("crypto");

const iterations  = 1000;
const keyLength   = 64;

const validatePassword = (password, hash, salt) => {
  const generatedHash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, "sha512")
    .toString("hex");

  return generatedHash === hash;
};

const generatePassword = (password) => {
  const salt = crypto
    .randomBytes(32)
    .toString("hex");
    
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, "sha512")
    .toString("hex");

  return { salt, hash };
};

module.exports = { validatePassword, generatePassword };
