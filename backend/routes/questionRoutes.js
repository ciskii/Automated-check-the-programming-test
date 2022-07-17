const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// @access Teacher, Student
router.get("/get", getQuestion);

// @access Teacher
router.post("/create", createQuestion);

// @access Teacher
router.put("/update", updateQuestion);

// @access Teacher
router.delete("/delete", deleteQuestion);

module.exports = router;
