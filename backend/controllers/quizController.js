const asyncHandler = require("express-async-handler");
const { Quiz, Sentquiz } = require("../models");

const createQuiz = (req, res) => {
  const { CourseId, name } = req.body;
  Quiz.create({ name: name, CourseId: CourseId })
    .then((quiz) => {
      res.json({ quiz: quiz });
    })
    .catch((err) => console.log("err", err));
};

const getAllQuizzes = asyncHandler(async (req, res) => {
  const { CourseId } = req.params;
  const quizzes = await Quiz.findAll({
    where: { CourseId: parseInt(CourseId) },
  });
  if (quizzes.length !== 0) {
    res.json({ quizzes: quizzes });
  } else {
    throw new Error("There is no quiz yet.");
  }
});

const getQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findOne({ where: { id: id } });
  if (quiz) {
    res.json({ quiz: quiz });
  } else {
    throw new Error("This quiz was not found.");
  }
});

const updateQuiz = (req, res) => {
  // todo check if string was empty
  const { id } = req.params;
  const { name } = req.body;

  Quiz.update({ name: name }, { where: { id: id } })
    .then(() => {
      res.json({ msg: "This quiz name has been updated." });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const deleteQuiz = (req, res) => {
  const { id } = req.params;
  Quiz.destroy({ where: { id: id } })
    .then(() => {
      res.json({ msg: `This quiz has been deleted.` });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const toggleRelease = (req, res) => {
  const { id, isRelease } = req.body;

  Quiz.update({ isRelease: isRelease }, { where: { id: id } })
    .then(() => {
      res.json({ msg: "Toggled release status." });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const isSentQuiz = asyncHandler(async (req, res) => {
  const { StudentId, idReleases } = req.body;
  const unsendIds = await Promise.all(
    idReleases.map(async (QuizId) => {
      const ids = await Sentquiz.findOne({
        where: { QuizId: QuizId, StudentId: StudentId },
      });
      if (!ids) {
        return QuizId;
      }
    })
  );
  const unsendIdsFilter = unsendIds.filter((item) => item);
  if (unsendIdsFilter) {
    res.json(unsendIdsFilter);
  } else {
    throw new Error("There is no answer yet.");
  }
});

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  toggleRelease,
  isSentQuiz,
};
