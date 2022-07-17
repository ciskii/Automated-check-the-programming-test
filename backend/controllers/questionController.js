const asyncHandler = require("express-async-handler");
const { Question } = require("../models");

const createQuestion = (req, res) => {
  res.send("createQuestion");
};

const getQuestion = (req, res) => {
  res.send("getQuestion");
};

const updateQuestion = (req, res) => {
  res.send("updateQuestion");
};

const deleteQuestion = (req, res) => {
  res.send("deleteQuestion");
};

module.exports = {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
