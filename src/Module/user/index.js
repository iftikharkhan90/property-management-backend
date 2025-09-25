const express = require("express");
const { model } = require("mongoose");
const { createUser } = require("./controller");

const router = express.Router();

router.post("/createUser/:token", createUser);

module.exports = router;
