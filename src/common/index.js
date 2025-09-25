const jwt = require("jsonwebtoken");
require("dotenv").config();

//For verfy token
const verifyToken = (token) => {
  try {
    const secretkey = process.env.JWT_SECRET;
    const decode = jwt.verify(token, secretkey);
    return {
      success: true,
      data: decode,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.message,
    };
  }
};

module.exports = {  verifyToken };