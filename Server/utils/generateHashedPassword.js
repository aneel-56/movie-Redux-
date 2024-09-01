const { generateHash } = require("./generateHash");
const generateRandomPassword = require("./generateRandomPassword");
generateRandomPassword;

function generateHashedPassword(password) {
  const random = generateRandomPassword(password);
  return generateHash(random);
}

module.exports = generateHashedPassword;
