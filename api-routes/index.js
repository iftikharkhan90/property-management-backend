const express = require("express");
const adminuserModeule = require("../Module/user/index");
const projectsModule = require("../Module/projects/index");
const userModeule = require("../Module/user");

const router = express.Router();
router.use("/adminuser", adminuserModeule);
router.use("/projects", projectsModule);
router.use("/user", userModeule);
module.exports = router;
