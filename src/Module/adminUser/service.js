const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comaprePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch; // true or false
  } catch (error) {
    throw new Error("Password comparison failed", error.message); // re-throw for caller
  }
};

//For generate token
const generateToken = (user) => {
  const payload = {
    id: user._id,
  };
  const secretKey = process.env.JWT_SECRET;
  const options = {
    expiresIn: "15d",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};




module.exports = { hashPassword, comaprePassword, generateToken, };
