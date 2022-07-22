const asyncHandler = require("express-async-handler");
const { Question } = require("../models");

const createQuestion = asyncHandler(async (req, res) => {
  const { QuizId } = req.params;
  const { questions } = req.body; // array of questions

  const newQuestions = await Promise.all(
    questions.map(async (question) => {
      const id = question.id;
      const questionObj = question.questionObj;
      if (id === "new") {
        // create new one
        const res = await Question.create({
          questionObj: questionObj,
          QuizId: QuizId,
        });
        return res;
      } else {
        // update an exist one
        const res = await Question.update(
          { questionObj: questionObj },
          { where: { id: id } }
        );
        return res;
      }
    })
  );
  if (newQuestions) {
    console.log("newQuestions", newQuestions);
    res.json(newQuestions);
  }
});

const createOneQuestion = asyncHandler(async (req, res) => {
  const { QuizId } = req.params;
  console.log("QuizId", QuizId);
  // const { questionObj } = req.body; // array of questions

  Question.create({ questionObj: "", QuizId: QuizId })
    .then((question) => {
      console.log("question", question);
      res.json({ question: question });
    })
    .catch((err) => console.log("err", err));

  // Question.create({ questionObj: questionObj, QuizId: QuizId })
  //   .then((question) => {
  //     res.json({ question: question });
  //   })
  //   .catch((err) => console.log("err", err));
});

const getAllQuestions = asyncHandler(async (req, res) => {
  const { QuizId } = req.params;
  const questions = await Question.findAll({ where: { QuizId: QuizId } });
  if (questions) {
    res.json(questions);
  } else {
    throw new Error("There is no question yet.");
  }
});

const getQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const question = await Question.findOne({ where: { id: id } });
  if (question) {
    res.json({ question: question });
  } else {
    throw new Error("This question was not found.");
  }
});

const updateQuestion = (req, res) => {
  // todo check if string was empty
  const { id } = req.params;
  const { questionObj } = req.body;

  Question.update({ questionObj: questionObj }, { where: { id: id } })
    .then(() => {
      res.json({ msg: "This question has been updated." });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const deleteQuestion = (req, res) => {
  const { id } = req.params;
  Question.destroy({ where: { id: id } })
    .then(() => {
      res.json({ msg: `This question has been deleted.` });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = {
  createQuestion,
  createOneQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
