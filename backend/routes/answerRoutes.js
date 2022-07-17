const express = require("express");
const router = express.Router();

const {
  isAuth,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

const {
  createAnswer,
  getAllAnswers,
  getAnswer,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answerController");

router.get("/getAll/:QuestionId", isAuth, getAllAnswers);

router.get("/get/:id", isAuth, getAnswer);

router.post("/create/:QuestionId", isAuth, createAnswer);

router.put("/update/:id", isAuth, updateAnswer);

router.delete("/delete/:id", isAuth, deleteAnswer);

module.exports = router;
