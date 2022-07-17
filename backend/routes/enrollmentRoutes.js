const express = require("express");
const router = express.Router();

const {
  isAuth,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

const {
  enrollCourse,
  getEnrolledStudents,
  dropEnrolledStudent,
} = require("../controllers/enrollmentController");

router.post("/enrollCourse", isStudent, enrollCourse);
router.get("/getStudents/:CourseId", isAuth, getEnrolledStudents);
router.delete("/drop", isTeacher, dropEnrolledStudent);

module.exports = router;
