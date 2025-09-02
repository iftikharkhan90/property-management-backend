const express = require("express");
const {
  showProjects,
  creatProjects,
  deleteProject,
  partialUpdateProject,
  allUpdateProject,
} = require("./controller");

const router = express.Router();
router.post("/creatProject/:token", creatProjects);
router.get("/getProjects/:token", showProjects);
router.patch("/deleteProject/:id", deleteProject);
router.patch("/partialUpdateProject/:id", partialUpdateProject);
router.put("/updateProject/:id", allUpdateProject);
module.exports = router;

router;
