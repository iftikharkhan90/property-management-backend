const adminUser = require("../../Model/adminUsers.model");
const user = require("../../Model/users.model")
const {
  hashPassword,
  comaprePassword,
  generateToken,
} = require("./service");

//For userCreat process
const creatadminUser = async () => {
  const plainPassword = "1234568789";
  const user = await adminUser.findOne({ email: "aa6148510@gmail.com" });
  if (!user) {
    const orginalPassword = await hashPassword(plainPassword);
    await adminUser.create({ password: orginalPassword });
  }
};

//For Login process
const adminUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Both email and password required" });
    }

    const user = await adminUser.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user eamil" });
    }

    const isMatch = await comaprePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user password" });
    }
    //if user exist than login and genrate password
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

module.exports = { creatadminUser, adminUserLogin,createUser};



