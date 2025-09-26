const express = require("express");
const { model } = require("mongoose");
const {
  createUser,
  putUser,
  patchUser,
  getUser,
  deleteUser,
} = require("./controller");
const {
  validateCreateUserRequest,
  validatePatchUserhRequest,
} = require("../../middle-ware/validation/user/index");
const {
  preprocessBody,
} = require("../../middle-ware/validation/projects/index");
const {
  verifyTokenAndAttachUser,
} = require("../../middle-ware/validation/auth/index");

const router = express.Router();
router.post(
  "/create",
  [verifyTokenAndAttachUser, preprocessBody, validateCreateUserRequest],
  createUser
);
router.get("/get", [verifyTokenAndAttachUser], getUser);
router.patch("/delete/:id", [verifyTokenAndAttachUser], deleteUser);
router.put(
  "/put/:id",
  [verifyTokenAndAttachUser, preprocessBody, validateCreateUserRequest],
  putUser
);
router.patch(
  "/patch/:id",
  [verifyTokenAndAttachUser, preprocessBody, validatePatchUserhRequest],
  patchUser
);

module.exports = router;
