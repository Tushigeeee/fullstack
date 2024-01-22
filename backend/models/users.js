const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  userImage: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("User", userSchema);
