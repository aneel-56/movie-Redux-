const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  const token = req.cookies;
  console.log("token", token);
  if (!token) {
    throw Error("Sorry, Unauthorized Access");
  }
  try {
    const match = await jwt.verify(token, process.env.SECRET);
    if (!match) {
      throw Error("Wrong Credentials on Server Side");
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = requireAuth;
