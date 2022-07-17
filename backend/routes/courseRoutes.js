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

// @access Teacher, Student
router.get("/getAll", isAuth, getAllCourses);

// @access Teacher, Student
router.get("/get/:id", isAuth, getCourse);

// @access Teacher
router.post("/create", isTeacher, createCourse);
// router.post("/create", createCourse);

// @access Teacher
router.put("/update/:id", isTeacher, updateCourse);

// @access Teacher
router.delete("/delete/:id", isTeacher, deleteCourse);

module.exports = router;
