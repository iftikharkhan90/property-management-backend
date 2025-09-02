const express = require("express");
const userModeule = require("../Module/user/index");
const projectsModule = require("../Module/projects/index");

const router = express.Router();
router.use("/user", userModeule);
router.use("/projects", projectsModule);

module.exports = router;
