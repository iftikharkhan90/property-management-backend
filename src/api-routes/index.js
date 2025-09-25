const express = require("express");
const adminUserModeule = require("../Module/adminUser/index");
const projectsModule = require("../Module/projects/index");
const userModeule = require("../Module/user");

const router = express.Router();
router.use("/adminuser", adminUserModeule);
router.use("/projects", projectsModule);
router.use("/user", userModeule);
module.exports = router;
