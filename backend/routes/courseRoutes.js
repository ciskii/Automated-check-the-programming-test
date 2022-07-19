const express = require("express");
const router = express.Router();

const {
  isAuth,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.get("/getAll", isAuth, getAllCourses);
router.get("/get/:id", isAuth, getCourse);
router.post("/create", isTeacher, createCourse);
router.put("/update/:id", isTeacher, updateCourse);
router.delete("/delete/:id", isTeacher, deleteCourse);

module.exports = router;
