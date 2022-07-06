const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      require: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxLength: 64,
      require: true,
    },
    fName: String,
    lName: String,
    role: {
      type: String,
      default: "student",
      lowercase: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
