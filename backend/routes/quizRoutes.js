const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

// @access Teacher, Student
router.get("/get", getQuiz);

// @access Teacher
router.post("/create", createQuiz);

// @access Teacher
router.put("/update", updateQuiz);

// @access Teacher
router.delete("/delete", deleteQuiz);

module.exports = router;
