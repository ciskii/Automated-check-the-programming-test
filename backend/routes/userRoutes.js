const express = require("express");

const {
  loginUser,
  signupUser,
  signupTeacher,
} = require("../controllers/userController");

const {
  isAuth,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginUser, (req, res) => {
  if (!req.user) {
    res.status(401).send("Login Failed");
  } else {
    const user = req.user;
    res.json({ email: user.email });
  }
});

router.get("/loginFailed", (req, res) => {
  res.status(401).send("Login Failed");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Logout");
});

router.post("/signupTeacher", signupTeacher);
router.post("/signup", signupUser);

module.exports = router;
