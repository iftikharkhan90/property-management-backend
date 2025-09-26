const user = require("../../Model/users.model");
const User = require("../../Model/users.model");

//For take Mazdoor data
const createUser = async (req, res) => {
  try {
    const data = req.validatedData;
    const _user = await user.create(data);
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
    const projects = await User.find({ isDelete: false });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ success: false, message: "No User found" });
    }

    return res.status(200).json({ success: true, projects: projects });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("id not found");
    }

    const data = req.validatedData;
    const project = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successful",
      project,
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

const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("id not found");
    }

    const data = req.validatedData;
    const project = await User.findByIdAndUpdate(id, data, { new: true });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project replaced successfully",
      project,
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("id not found");
    }
    const project = await User.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true }
    );
    return res.status(200).json({ success: true, user: project });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};
module.exports = { createUser, putUser, patchUser, getUser, deleteUser };
