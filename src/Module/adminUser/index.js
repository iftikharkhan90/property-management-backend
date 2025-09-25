const express = require("express");
const { model } = require("mongoose");
const { adminUserLogin, createUser } = require("./controller");
const {loginValidationRequest,preprocessLoginBody,checkAdminExist } = require("../../middle-ware/validation/auth/index")

const router = express.Router();

router.post("/login",[preprocessLoginBody,loginValidationRequest,checkAdminExist], adminUserLogin);


module.exports = router;
