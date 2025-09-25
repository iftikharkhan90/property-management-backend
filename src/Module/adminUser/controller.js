const adminUser = require("../../Model/adminUsers.model");
const {
  hashPassword,
  comaprePassword,
  generateToken,
} = require("./service");

//For userCreat process
const creatadminUser = async () => {
  const plainPassword = "123";
  const user = await adminUser.findOne({ email: "aa6148510@gmail.com" });
  if (!user) {
    const orginalPassword = await hashPassword(plainPassword);
    await adminUser.create({ password: orginalPassword });
  }
};

//For Login process
const adminUserLogin = async (req, res) => {
  try {
    const user = req.data
    const token = generateToken(user);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error: " + err.message,
    });
  }
};

module.exports = { creatadminUser, adminUserLogin};



