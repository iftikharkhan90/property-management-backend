const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    phoneNumber: { type: String },
    dailyIncome: { type: Number },
    reciveIncome: { type: Number, default: 0 },
    type: { type: String, default: "user" },
    isDelete: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", userSchema);
