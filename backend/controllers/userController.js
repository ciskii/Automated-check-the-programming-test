const passport = require("passport");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     throw new Error("Please add all fields");
//   }

//   const user = await User.findOne({ email: email });

//   if (!user) {
//     throw new Error("Email doesn't exist");
//   }
//   const validPassword = await bcrypt.compare(password, user.password);

//   if (validPassword) {
//     res.status(200).send("Login success");
//   } else {
//     res.status(401).send("Login failed");
//   }
// });

const loginUser = passport.authenticate("local", {
  successRedirect: "/login/yeah",
  failureRedirect: "/login",
});

const loginPage = (req, res) => {
  res.status(200).send("Login Page");
};
const yeah = (req, res) => {
  res.status(200).send("YEAH");
};

// @desc    Register a user
// @route   POST /api/users/signup
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
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

  await User.create({ email: email, password: hashPassword }, (err, user) => {
    if (err) throw new Error("Cannot create new user");
    res.status(200).send("Create user success");
  });
});

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

// @desc    Hash password function
const hash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  signupUser,
  signupTeacher,
  loginUser,
  loginPage,
  yeah,
};
