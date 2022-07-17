const asyncHandler = require("express-async-handler");
const { Enrollment } = require("../models");

//  @access Student
const enrollCourse = (req, res) => {
  const { id } = req.user; // Student ID
  const { CourseId } = req.body; // Course ID that student want to enroll

  Enrollment.create({ StudentId: id, CourseId: CourseId })
    .then((enrolled) => {
      res.json({ enrolled: enrolled });
    })
    .catch((err) => console.log("err", err));
};

// @access Teacher
const getEnrolledStudents = asyncHandler(async (req, res) => {
  const { CourseId } = req.params; // use params because when user click at the course on client, the client will retrieve Course Id from getCOurse API and attach to the url then they'll request from that url
  const enrolledStudents = await Enrollment.findAll({
    where: { CourseId: CourseId },
  });
  if (enrolledStudents) {
    res.json({ enrolledStudents: enrolledStudents });
  } else {
    throw new Error("There is no enrolled student yet.");
  }
});

// @access Teacher
const dropEnrolledStudent = (req, res) => {
  const { CourseId, StudentId } = req.body;
  Enrollment.destroy({ where: { CourseId: CourseId, StudentId: StudentId } })
    .then(() => {
      res.json({ msg: `This student has been dropped from this course.` });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = {
  enrollCourse,
  getEnrolledStudents,
  dropEnrolledStudent,
};
