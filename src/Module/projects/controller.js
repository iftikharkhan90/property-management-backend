const Projects = require("../../Model/projects.model");
const User = require("../../Model/adminUsers.model");

//For creat porjects
const creatProjects = async (req, res) => {
  try {
    const data = req.validatedData;
    const _user = await Projects.create(data);
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

//For sow all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find({ isDelete: false });

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found" });
    }

    return res.status(200).json({ success: true, projects: projects });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

//For delete project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json();
    }
    const project = await Projects.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true }
    );
    return res.status(200).json({ success: true, user: project });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "server err" + err.message });
  }
};

//For partiacl update project
const patchProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("id not found");
    }

    const data = req.validatedData;
    const project = await Projects.findByIdAndUpdate(
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

const putProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("id not found");
    }

    const data = req.validatedData;
    const project = await Projects.findByIdAndUpdate(id, data, { new: true });

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

module.exports = {
  creatProjects,
  getProjects,
  deleteProject,
  patchProject,
  putProject,
};
