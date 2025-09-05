const Projects = require("../../Model/projects.model");
const { verifyToken } = require("../user/service");
const User = require("../../Model/adminUsers.model");

//For creat porjects
const creatProjects = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login first" });
    }
    const {
      projectName,
      ownerName,
      estimatedStartDate,
      estimatedEndDate,
      city,
      address,
    } = req.body;

    const result = verifyToken(token);
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: "please login first",
        error: result.error,
      });
    }

    const userId = result.data.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Please Login" });
    }

    const project = await Projects.create({
      projectName,
      ownerName,
      estimatedStartDate,
      estimatedEndDate,
      city,
      address,
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
    const { token } = req.body;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login first" });
    }

    const result = verifyToken(token);
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: "please login first",
        error: result.error,
      });
    }
    const allProjects = await Projects.find({ isDelete: false });

    if (allProjects.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found" });
    }

    return res.status(200).json({ success: true, projects: allProjects });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

//For delete project
const deleteProject = async (req, res) => {
  try {
    const {id} = req.body;
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
const partialUpdateProject = async (req, res) => {
  try {
    const { id } = req.body;

    const {
      projectName,
      ownerName,
      estimatedStartDate,
      estimatedEndDate,
      city,
      address,
    } = req.body;
    const body = {
      projectName,
      ownerName,
      estimatedStartDate,
      estimatedEndDate,
      city,
      address,
    };

    Object.keys(body).forEach((key) => {
      if (body[key] === "" || body[key] === null || body[key] === undefined) {
        delete body[key];
      }
    });

    // Update project
    const project = await Projects.findByIdAndUpdate(
      id,
      { $set: body },
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

const allUpdateProject = async (req, res) => {
  try {
    const { id } = req.body;
    const { ownerName, projectName, date, address, location, city } = req.body;

    const body = { ownerName, projectName, date, address, location, city };

    const project = await Projects.findByIdAndUpdate(id, body, { new: true });

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
  showProjects,
  deleteProject,
  partialUpdateProject,
  allUpdateProject,
};

// Object.keys(body).forEach(key => {
//   if (body[key] === "" || body[key] === null || body[key] === undefined) {
//     delete body[key];
//   }
// });
