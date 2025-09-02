const User = require("../../Model/adminUsers.model");
const {
  hashPassword,
  comaprePassword,
  generateToken,
  verifyToken,
} = require("./service");

//For userCreat process
const creatUser = async () => {
  const plainPassword = "1234568789";
  const user = await User.findOne({ email: "aa6148510@gmail.com" });
  if (!user) {
    const orginalPassword = await hashPassword(plainPassword);
    await User.create({ password: orginalPassword });
  }
};

//For Login process
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Both email and password required" });
    }

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

//For add projects
const creatProjects = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login first" });
    }
    const { ownerName, projectName, date, address, city, location } = req.body;

    const result = verifyToken(token);
    if (!result.success) {
      return res.status(401).json({ success: false, message: result.error });
    }
    const userId = result.data.id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Please Login" });
    }

    const project = await Projects.create({
      ownerName,
      projectName,
      date,
      address,
      city,
      location,
    });
    return res.status(201).json({
      success: true,
      message: "Project created successfull",
      projects: project,
    });
  } catch (err) {
    
    return res.status(500).json({
      success: false,
      error: "server error" + err.message,
    });
  }
};

//For sow all projects
const showProjects = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login first" });
    }
    const result = verifyToken(token);
    if (!result.success) {
      return res.status(401).json({ success: false, message: result.error });
    }

    const allProjects = await Projects.find();
    if (!allProjects) {
      return res
        .status(401)
        .json({ success: false, message: "No projects find" });
    }
    return res.status(401).json({ success: true, projects: allProjects });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "server err" + err.message });
  }
};
module.exports = { creatUser, userLogin, creatProjects, showProjects };
