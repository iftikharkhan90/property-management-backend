const express = require("express");
const {
  validateCreateProjectRequest,
  preprocessBody,
  validateCreatePatchRequest,
} = require("../../middle-ware/validation/projects/index");
const {
  verifyTokenAndAttachUser,
} = require("../../middle-ware/validation/auth/index");
const {
  getProjects,
  creatProjects,
  deleteProject,
  patchProject,
  putProject,
} = require("./controller");

const router = express.Router();

router.post(
  "/creat",
  [verifyTokenAndAttachUser, preprocessBody, validateCreateProjectRequest],
  creatProjects
);
router.get("/get", [verifyTokenAndAttachUser], getProjects);
router.patch("/delete", [verifyTokenAndAttachUser], deleteProject);
router.patch(
  "/patch/:id",
  [verifyTokenAndAttachUser, preprocessBody, validateCreatePatchRequest],
  patchProject
);
router.put(
  "/put/:id",
  [verifyTokenAndAttachUser, preprocessBody, validateCreateProjectRequest],
  putProject
);
module.exports = router;
