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
  provideScore,
  updateScore,
  getAllScores,
  getScore,
} = require("../controllers/answerController");

// todo fix get all score controller

// ----------- Answer Router ------------
router.get("/getAll/:QuestionId", isAuth, getAllAnswers);
router.get("/get/:id", isAuth, getAnswer);
router.post("/create/:QuestionId", isAuth, createAnswer);
router.put("/update/:id", isAuth, updateAnswer);
router.delete("/delete/:id", isAuth, deleteAnswer);

// ------------ Score Route ------------
router.post("/score/provide/:id", isAuth, provideScore);
router.get("/score/getAll/:QuestionId", isAuth, getAllScores);
router.get("/score/get/:id", isAuth, getScore);
router.put("/score/update/:id", isAuth, updateScore);

module.exports = router;
