const express = require("express");
const router = express.Router();

const { isAuth, isTeacher } = require("../middleware/authMiddleware");

const {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  toggleRelease,
} = require("../controllers/quizController");

// @access Teacher, Student
router.get("/getAll/:CourseId", isAuth, getAllQuizzes);

// @access Teacher, Student
router.get("/get/:id", isAuth, getQuiz);

// @access Teacher
router.post("/create", isTeacher, createQuiz);

// @access Teacher
router.put("/update/:id", isTeacher, updateQuiz);

// @access Teacher
router.delete("/delete/:id", isTeacher, deleteQuiz);

router.put("/toggleRelease", isTeacher, toggleRelease);

module.exports = router;
