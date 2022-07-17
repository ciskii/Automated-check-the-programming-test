const asyncHandler = require("express-async-handler");
const { Quiz } = require("../models");

const createQuiz = async (req, res) => {
  // const quizId = "HS101";
  // const name = "Hearthstone 101";
  // Quiz.create({ quizId: quizId, name: name })
  //   .then((quiz) => {
  //     console.log("user", quiz);
  //     res.send(quiz);
  //   })
  //   .catch((err) => console.log("err", err));
};

const getQuiz = (req, res) => {
  res.send("getQuiz");
};

const updateQuiz = (req, res) => {
  res.send("updateQuiz");
};

const deleteQuiz = (req, res) => {
  res.send("deleteQuiz");
};

module.exports = {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};
