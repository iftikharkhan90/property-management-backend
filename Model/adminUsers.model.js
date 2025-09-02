const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, default: "aa6148510@gmail.com" },
  password: { type: String, require: true, select: false },
  // role:{type:String,
  //   enum:["user","admin"]
  // }
}, {
    timestamps: true // Add this line
});
module.exports = mongoose.model("admin_users", userSchema);
