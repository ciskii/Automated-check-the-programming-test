const asyncHandler = require("express-async-handler");
const { Enrollment, Course, Student } = require("../models");

//  @access Student
const enrollCourse = asyncHandler(async (req, res) => {
  const { id } = req.user; // Student ID
  const { courseId, semester, year } = req.body; // Course ID that student want to enroll

  const course = await Course.findOne({
    where: { courseId: courseId, semester: semester, year: year },
  });

  console.log("course", course);
  if (course) {
    const enrolled = await Enrollment.findOne({
      where: { StudentId: id, CourseId: course.id },
    });
    if (!enrolled) {
      Enrollment.create({ StudentId: id, CourseId: course.id })
        .then((enrolled) => {
          console.log("enrolled", enrolled);
          res.json(enrolled);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      throw new Error(`You already enrolled this course.`);
    }
  } else {
    throw new Error(`This Course ID doesn't exist.`);
  }
});

// @access Teacher
const getEnrolledStudents = asyncHandler(async (req, res) => {
  const { CourseId } = req.body; // use params because when user click at the course on client, the client will retrieve Course Id from getCOurse API and attach to the url then they'll request from that url
  const enrolledStudents = await Enrollment.findAll({
    where: { CourseId: CourseId },
  });

  if (enrolledStudents) {
    const students = await Promise.all(
      enrolledStudents.map(async (student) => {
        const res = await Student.findOne({
          where: { id: student.StudentId },
        });
        return {
          id: student.StudentId,
          firstName: res.firstName,
          lastName: res.lastName,
        };
      })
    );
    res.json(students);
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
