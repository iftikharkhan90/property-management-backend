const express = require("express");
const userModeule = require("../Module/user/index")

const router = express.Router();
router.use("/user", userModeule);

module.exports = router;