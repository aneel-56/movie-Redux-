const jwt = require("jsonwebtoken");
const generateJwtToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1m", // The token will expire in 1 hour.
  });
  return token;
};

module.exports = generateJwtToken;
