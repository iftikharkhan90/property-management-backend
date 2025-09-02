const express = require("express");
const { model } = require("mongoose");
const { userLogin, creatProjects } = require("./controller");

const router = express.Router();

router.post("/login", userLogin);

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjAxODZkM2Q4NGZhMGNlMzNhYTQ3YyIsImlhdCI6MTc1NjcwNjMzMywiZXhwIjoxNzU4MDAyMzMzfQ.t2TaYhsg6PJMKeWkhPS4GkTfdAr0hFJE2R_0TcOo5e0
