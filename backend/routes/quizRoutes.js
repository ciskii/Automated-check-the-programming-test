const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

// @access Teacher, Student
router.get("/getAll/:CourseId", getAllQuizzes);

// @access Teacher, Student
router.get("/get/:id", getQuiz);

// @access Teacher
router.post("/create/:CourseId", createQuiz);

// @access Teacher
router.put("/update/:id", updateQuiz);

// @access Teacher
router.delete("/delete/:id", deleteQuiz);

module.exports = router;
