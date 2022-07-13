const express = require("express");
const clientURL = "http://localhost:3000/";

const {
  loginUser,
  logoutUser,
  signupUser,
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
    console.log("req.session.messages", req.session.messages);
    res.status(400);
    throw new Error("The user name or password are incorrect.");
  } else {
    const user = req.user;
    res.json({ email: user.email });
    // res.redirect(clientURL);
  }
});
router.post("/logout", isAuth, logoutUser);

router.post("/isLoggedIn", isAuth, (req, res) => {
  res.status(200).json({ msg: "You are logged in" });
});

router.post("/signup", signupUser);
router.post("/signupTeacher", signupTeacher);

router.get("/getMe", isAuth, getMe);

module.exports = router;
