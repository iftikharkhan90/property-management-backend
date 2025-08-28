const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, default: "aa6148510@gmail.com",},
  password: { type: String, require: true,select: false, },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
