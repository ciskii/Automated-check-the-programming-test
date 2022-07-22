const express = require("express");
const { Student } = require("../models");

const {
  loginUser,
  logoutUser,
  signUpStudent,
  signupTeacher,
  getMe,
} = require("../controllers/userController");

const {
  isAuth,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginUser, (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("The user name or password are incorrect.");
  } else {
    const user = req.user;
    res.json({ email: user.email });
  }
});

router.post("/logout", isAuth, logoutUser);
router.post("/signupStudent", signUpStudent);
router.post("/signupTeacher", signupTeacher);
router.get("/getMe", isAuth, getMe);
router.get("/isLoggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("logged in");
    res.status(200).json({ isLoggedin: true });
  } else res.status(400).json({ isLoggedin: false });
});

module.exports = router;
