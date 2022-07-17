const express = require("express");
const router = express.Router();

const {
  isAuth,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// @access Teacher, Student
router.get("/get", isAuth, getCourses);

// @access Teacher
router.post("/create", isTeacher, createCourse);
// router.post("/create", createCourse);

// @access Teacher
router.put("/update/:id", isTeacher, updateCourse);

// @access Teacher
router.delete("/delete/:id", isTeacher, deleteCourse);

module.exports = router;
