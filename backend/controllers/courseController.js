const asyncHandler = require("express-async-handler");
const { Course } = require("../models");

const createCourse = (req, res) => {
  const { courseId, name } = req.body;

  Course.create({ courseId: courseId, name: name, TeacherId: req.user.id })
    .then((course) => {
      res.json({ course: course });
    })
    .catch((err) => console.log("err", err));
};

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({ where: { TeacherId: req.user.id } });
  if (courses) {
    res.json({ courses: courses });
  } else {
    throw new Error("There is no course yet.");
  }
});

const getCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOne({ where: { id: id } });
  if (course) {
    res.json({ course: course });
  } else {
    throw new Error("Course was not found.");
  }
});

const updateCourse = (req, res) => {
  // todo check if string was empty
  const { id } = req.params;
  const { courseId, name } = req.body;
  console.log("courseId", courseId);
  console.log("name", name);

  Course.update({ courseId: courseId, name: name }, { where: { id: id } })
    .then((course) => {
      console.log("course", course);
      res.json({ msg: "Course has been updated." });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const deleteCourse = (req, res) => {
  const { id } = req.params;
  Course.destroy({ where: { id: id } })
    .then((course) => {
      console.log("course", course);
      res.json({ msg: `Course has been deleted.` });
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
