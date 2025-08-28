const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comaprePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};


const generateToken = (user) => {
  const payload = {
    id: user._id,
  };
  const secretKey = process.env.JWT_SECRET || "mysupersecretkeyBeconsPress";
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};
module.exports = { hashPassword, comaprePassword , generateToken };
