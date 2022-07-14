const passport = require("passport");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
// const loginUser = passport.authenticate("local");
const loginUser = passport.authenticate("local", {
  failureMessage: "The email or password are incorrect.",
});

// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.json({ msg: "You are logged out" });
};

// @desc    Register a student user
// @route   POST /api/users/signup
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please add all fields");
  }

  const user = await User.find({ email: email });
  console.log("email", email);
  console.log("user", user);
  console.log("user.length", user.length);
  if (user.length === 1) {
    console.log("yoo");
    res.status(400);
    throw new Error("This email address is already being used.");
  }

  const hashPassword = await hash(password);

  await User.create({ email: email, password: hashPassword }, (err, user) => {
    if (err) throw new Error("Cannot create new user");
    res.json({ email: user.email });
  });
});

// @desc    Register a teacher user
// @route   POST /api/users/signupTeacher
// @access  Private
const signupTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please add all fields");
  }

  const user = await User.find({ email: email });

  if (!user) {
    console.log(user);
    throw new Error("Email already used");
  }

  const hashPassword = await hash(password);

  await User.create(
    { email: email, password: hashPassword, role: "teacher" },
    (err, user) => {
      if (err) throw new Error("Cannot create new user");
      res.status(200).send("Create user success");
    }
  );
});

// @desc    Get user information
// @route   POST /api/users/getMe
// @access  Private
const getMe = (req, res) => {
  console.log("req.user", req.user);
  res.json(req.user);
};

// @desc    Hash password function
const hash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  loginUser,
  logoutUser,
  signupUser,
  signupTeacher,
  getMe,
};
