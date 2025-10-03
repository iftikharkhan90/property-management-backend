const mongoose = require("mongoose");

const projectsSchemma = new mongoose.Schema({
  projectName: { type: String},
  ownerName: { type: String},
  estimatedStartDate: { type: Date},
  estimatedEndDate: { type: Date},
  city: { type: String},
  address: { type: String},
  isDelete: { type: String,default:false},
}, {
    timestamps: true 
});

const Projects = mongoose.model("Projects", projectsSchemma);
module.exports = Projects;
  