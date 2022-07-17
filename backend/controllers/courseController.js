const asyncHandler = require("express-async-handler");
const { Course } = require("../models");

const createCourse = async (req, res) => {
  const courseId = "HS101";
  const name = "Hearthstone 101";

  Course.create({ courseId: courseId, name: name })
    .then((course) => {
      console.log("user", course);
      res.send(course);
    })
    .catch((err) => console.log("err", err));
};

const getCourse = (req, res) => {
  res.send("getCourse");
};

const updateCourse = (req, res) => {
  res.send("updateCourse");
};

const deleteCourse = (req, res) => {
  res.send("deleteCourse");
};

module.exports = {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};
