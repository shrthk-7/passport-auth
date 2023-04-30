const crypto = require("crypto");

const validatePassword = (password, hash, salt) => {
  return true;
};

const generatePassword = (password) => {
  return "password";
};

module.exports = { validatePassword, generatePassword };
