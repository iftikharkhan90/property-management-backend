const express = require("express");
const { model } = require("mongoose");
const { userLogin } = require("./controller");

const router = express.Router();

router.post("/login", userLogin);

module.exports = router;
