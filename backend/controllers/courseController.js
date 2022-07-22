const asyncHandler = require("express-async-handler");
const { Course, Enrollment } = require("../models");

// @desc    Create a course
// @route   POST /api/course/create
// @access  Teacher
const createCourse = asyncHandler(async (req, res) => {
  const { courseId, courseName } = req.body;

  const courses = await Course.findOne({
    where: { TeacherId: req.user.id, courseId: courseId },
  });

  if (!courses) {
    Course.create({
      courseId: courseId,
      name: courseName,
      TeacherId: req.user.id,
    })
      .then((course) => {
        res.json({ course: course });
      })
      .catch((err) => {
        res.status(400);
        throw new Error(err);
      });
  } else {
    res.status(400);
    throw new Error(
      `You already have this Course ID. Please use a different Course ID.`
    );
  }
});

// @desc    Get all user's courses
// @route   GET /api/course/getAll
// @access  Teacher, Student
const getAllCourses = asyncHandler(async (req, res) => {
  // if (req.session.passport.user.role === "student") {
  if (req.role === "student") {
    // find enrolled courses
    const enrolledCourses = await Enrollment.findAll({
      where: { StudentId: req.user.id },
    });

    if (enrolledCourses) {
      // get enrolled courses info
      const courses = await Promise.all(
        enrolledCourses.map(async (course) => {
          console.log("course.CourseId", course.CourseId);
          const res = await Course.findOne({
            where: { id: course.CourseId },
          });
          return res;
        })
      );

      console.log("courses", courses);
      res.json({ courses: courses });
    } else {
      throw new Error("There is no course yet.");
    }
    // } else if (req.session.passport.user.role === "teacher") {
  } else if (req.role === "teacher") {
    const courses = await Course.findAll({ where: { TeacherId: req.user.id } });
    if (courses) {
      res.json({ courses: courses });
    } else {
      throw new Error("There is no course yet.");
    }
  }
});

// @desc    Get a specific course
// @route   GET /api/course/get/:id
// @access  ? Teacher
const getCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOne({ where: { id: id } });
  if (course) {
    res.json({ course: course });
  } else {
    throw new Error("This course was not found.");
  }
});

// @desc    Update a specific course
// @route   PUT /api/course/update/:id
// @access  Teacher
const updateCourse = (req, res) => {
  // todo check if string was empty
  const { id } = req.params;
  const { courseId, name } = req.body;
  console.log("courseId", courseId);
  console.log("name", name);

  Course.update({ courseId: courseId, name: name }, { where: { id: id } })
    .then((course) => {
      console.log("course", course);
      res.json({ msg: "This course has been updated." });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

// @desc    Delete a specific course
// @route   DELETE /api/course/delete/:id
// @access  Teacher
const deleteCourse = (req, res) => {
  const { id } = req.params;
  Course.destroy({ where: { id: id } })
    .then((course) => {
      console.log("course", course);
      res.json({ msg: `This course has been deleted.` });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
