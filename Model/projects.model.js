const mongoose = require("mongoose");

const projectsSchemma = new mongoose.Schema({
  projectName: { type: String, required: true },
  ownerName: { type: String, required: true },
  estimatedStartDate: { type: String, required: true },
  estimatedEndDate: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  isDelete: { type: String, default: false },
}, {
    timestamps: true 
});

const Projects = mongoose.model("Projects", projectsSchemma);
module.exports = Projects;
