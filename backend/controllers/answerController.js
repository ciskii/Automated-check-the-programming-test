const asyncHandler = require("express-async-handler");
const { Answer } = require("../models");

const createAnswer = (req, res) => {
  const { QuestionId } = req.params;
  const { answerObj } = req.body;

  Answer.create({ answerObj: answerObj, QuestionId: QuestionId })
    .then((answer) => {
      res.json({ answer: answer });
    })
    .catch((err) => console.log("err", err));
};

const getAllAnswers = asyncHandler(async (req, res) => {
  const { QuestionId } = req.params;
  const answers = await Answer.findAll({ where: { QuestionId: QuestionId } });
  if (answers) {
    res.json({ answers: answers });
  } else {
    throw new Error("There is no answer yet.");
  }
});

const getAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const answer = await Answer.findOne({ where: { id: id } });
  if (answer) {
    res.json({ answer: answer });
  } else {
    throw new Error("This answer was not found.");
  }
});

const updateAnswer = (req, res) => {
  // todo check if string was empty
  const { id } = req.params;
  const { answerObj } = req.body;

  Answer.update({ answerObj: answerObj }, { where: { id: id } })
    .then(() => {
      res.json({ msg: "This answer has been updated." });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const deleteAnswer = (req, res) => {
  const { id } = req.params;
  Answer.destroy({ where: { id: id } })
    .then(() => {
      res.json({ msg: `This answer has been deleted.` });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswer,
  updateAnswer,
  deleteAnswer,
};
