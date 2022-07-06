const express = require("express");
const passport = require("passport");
const {
  loginUser,
  signupUser,
  signupTeacher,
  loginPage,
  yeah,
} = require("../controllers/userController");
const router = express.Router();

// router.post("/", registerUser);
router.post("/login", loginUser);

router.post("/signupTeacher", signupTeacher);
router.post("/signup", signupUser);
router.get("/", loginPage);
router.get("/yeah", yeah);

module.exports = router;
