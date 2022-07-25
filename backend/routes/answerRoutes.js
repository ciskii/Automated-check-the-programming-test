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
router.post("/getAll/:StudentId", isAuth, getAllAnswers); // use post because it'll need an array of question objects not a single object so you can't put a bunch of object into one single params but you can use StudentId as a params because it wants 1 student id

router.get("/get/:id", isAuth, getAnswer);
router.post("/create/", isAuth, createAnswer);
router.put("/update/:id", isAuth, updateAnswer);
router.delete("/delete/:id", isAuth, deleteAnswer);

// ------------ Score Route ------------
router.post("/score/provide/:id", isAuth, provideScore);
router.get("/score/getAll/:QuestionId", isAuth, getAllScores);
router.get("/score/get/:id", isAuth, getScore);
router.put("/score/update/:id", isAuth, updateScore);

module.exports = router;
