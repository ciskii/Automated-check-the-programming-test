const asyncHandler = require("express-async-handler");
const { Course } = require("../models");

// @desc    Create a course
// @route   POST /api/course/create
// @access  Teacher
const createCourse = (req, res) => {
  const { courseId, courseName } = req.body;

  Course.create({
    courseId: courseId,
    name: courseName,
    TeacherId: req.user.id,
  })
    .then((course) => {
      console.log("course", course);
      res.json({ course: course });
    })
    .catch((err) => console.log("err", err));
};

// @desc    Get all teacher's courses
// @route   GET /api/course/getAll
// @access  ? Teacher
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({ where: { TeacherId: req.user.id } });
  if (courses) {
    res.json({ courses: courses });
  } else {
    throw new Error("There is no course yet.");
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
