const express = require("express");
const router = express.Router();

const {
  createAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answerController");

// @access Teacher, Student
router.get("/get", getAnswer);

// @access Teacher
router.post("/create", createAnswer);

// @access Teacher
router.put("/update", updateAnswer);

// @access Teacher
router.delete("/delete", deleteAnswer);

module.exports = router;
