const passport = require("passport");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { Student, Teacher } = require("../models");

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = passport.authenticate("local", {
  failureMessage: "The email or password are incorrect.",
});

// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req, res, next) => {
  console.log("logoutUser".yellow);
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
const signUpStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("email, password", email, password);
  if (!email || !password) {
    throw new Error("Please add all fields");
  }

  const user = await Student.findAll({
    where: {
      email: email,
    },
  });

  if (user.length === 1) {
    console.log("This email address is already being used.");
    res.status(400);
    throw new Error("This email address is already being used.");
  }

  const hashPassword = await hash(password);

  await Student.create({ email: email, password: hashPassword }).then(
    (user) => {
      console.log("Create student user success:", user);
      res.json({ email: user.email });
    }
  );
});

// @desc    Register a teacher user
// @route   POST /api/users/signupTeacher
// @access  Private
const signupTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("email, password", email, password);
  if (!email || !password) {
    throw new Error("Please add all fields");
  }

  const user = await Teacher.findAll({
    where: {
      email: email,
    },
  });

  if (user.length === 1) {
    console.log("This email address is already being used.");
    res.status(400);
    throw new Error("This email address is already being used.");
  }

  const hashPassword = await hash(password);

  await Teacher.create({ email: email, password: hashPassword }).then(
    (user) => {
      console.log("Create teacher user success:", user);
      res.json({ email: user.email });
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
  signUpStudent,
  signupTeacher,
  getMe,
};
