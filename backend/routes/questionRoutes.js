const express = require("express");
const router = express.Router();

const { isAuth, isTeacher } = require("../middleware/authMiddleware");

const {
  createQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// @access Teacher, Student
router.get("/getAll/:QuizId", isAuth, getAllQuestions);

// @access Teacher, Student
router.get("/get/:id", isAuth, getQuestion);

// @access Teacher
router.post("/create/:QuizId", isTeacher, createQuestion);

// @access Teacher
router.put("/update/:id", isTeacher, updateQuestion);

// @access Teacher
router.delete("/delete/:id", isTeacher, deleteQuestion);

module.exports = router;
