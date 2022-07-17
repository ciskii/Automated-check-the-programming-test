const express = require("express");
const router = express.Router();

const {
  isAuth,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

const {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// @access Teacher, Student
router.get("/get", getCourse);

// @access Teacher
router.post("/create", isTeacher, createCourse);
// router.post("/create", createCourse);

// @access Teacher
router.put("/update", updateCourse);

// @access Teacher
router.delete("/delete", deleteCourse);

module.exports = router;
