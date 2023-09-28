const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  fullName: {
    type: String,
    required: [true, "Full Name is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }
});

const User = mongoose.model("User", userModel);
module.exports = User;
