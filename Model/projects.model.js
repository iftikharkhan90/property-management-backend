const mongoose = require("mongoose");

const projectsSchemma = new mongoose.Schema({
  ownerName: { type: String, required: true },
  projectName: { type: String, required: true },
  date: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  isDelete: { type: String, default: false },
}, {
    timestamps: true 
});

const Projects = mongoose.model("Projects", projectsSchemma);
module.exports = Projects;
