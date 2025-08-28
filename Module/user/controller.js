const User = require("../../Model/user.model");
const { hashPassword, comaprePassword, generateToken } = require("./service");

//For userCreat process
const creatUser = async () => {
  const plainPassword = "1234568789";
  const user = await User.findOne({ email: "aa6148510@gmail.com" });
  console.log("Usma:", user);
  if (!user) {
    const orginalPassword = await hashPassword(plainPassword);
    const user = await User.create({ password: orginalPassword });
    console.log("user created:", user);
  }
};

//For Login process
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
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
module.exports = { creatUser,userLogin };
