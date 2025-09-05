const user = require("../../Model/users.model");

//For take Mazdoor data
const createUser = async (req, res) => {
  try {
    const { token } = req.params;
    const { name, phoneNumber, dailyIncome, reciveIncome } = req.body;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login first" });
    }
    const result = verifyToken(token);
    if (!result.success) {
      return res
        .status(401)
        .json({
          success: false,
          message: "please login first",
          error: result.error,
        });
    }
    if (!name || !phoneNumber || !dailyIncome) {
      return res
        .status(401)
        .json({ success: false, message: "All input require" });
    }
    const _user = await user.create({
      name,
      phoneNumber,
      dailyIncome,
      reciveIncome,
    });
    return res.status(201).json({
      success: true,
      message: "user created successfull",
      projects: _user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error" + err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login first" });
    }
    const result = verifyToken(token);
    if (!result.success) {
      return res
        .status(401)
        .json({
          success: false,
          message: "please login first",
          error: result.error,
        });
    }
    const allUser = await Projects.find({ isDelete: false });

    if (allUser.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found" });
    }
    return res.status(200).json({ success: true, user: allUser });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error" + err.message,
    });
  }
};

//For partiacl update project
const partialUserProject = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, phoneNumber, dailyIncome, reciveIncome } = req.body;
    const body = { name, phoneNumber, dailyIncome, reciveIncome };

    Object.keys(body).forEach((key) => {
      if (body[key] === "" || body[key] === null || body[key] === undefined) {
        delete body[key];
      }
    });

    // Update project
    const _user = await user.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successful",
      _user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = { createUser };
