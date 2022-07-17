const asyncHandler = require("express-async-handler");
const { Answer } = require("../models");

const createAnswer = (req, res) => {
  res.send("createAnswer");
};

const getAnswer = (req, res) => {
  res.send("getAnswer");
};

const updateAnswer = (req, res) => {
  res.send("updateAnswer");
};

const deleteAnswer = (req, res) => {
  res.send("deleteAnswer");
};

module.exports = {
  createAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
};
