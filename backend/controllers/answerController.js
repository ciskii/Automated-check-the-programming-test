const asyncHandler = require("express-async-handler");
const { Answer } = require("../models");

const path = require("node:path");
const { spawn } = require("child_process");
const fs = require("fs/promises");

// ~~~~~~~~~~~~ Answer obj API ~~~~~~~~~~~ //
const createAnswer = asyncHandler(async (req, res) => {
  const { savedAnswers, StudentId, QuizId } = req.body;
  // console.log("savedAnswers", savedAnswers);

  const answers = await Promise.all(
    savedAnswers.map(async (answer) => {
      const { QuestionId, answerObj, mergeAnswer, language } = answer;

      // ~~~~~~~~~~ call check answer ~~~~~~~~~~ //
      await checkAnswers(StudentId, QuestionId, mergeAnswer, language);

      // const res = await Answer.create({
      //   answerObj: answerObj,
      //   QuestionId: QuestionId,
      //   StudentId: StudentId,
      //   QuizId: QuizId,
      // });
      // return res;
    })
  );

  // if (answers) {
  //   console.log("answers", answers);
  //   res.json(answers);
  // }
});

// ~~~~~~~~~~ check the answers ~~~~~~~~~~ //
const checkAnswers = async (StudentId, QuestionId, mergeAnswer, language) => {
  let fileName = "";
  let command = "";
  let testResult;
  if (language === "javascript") {
    fileName = "node_" + StudentId + "_" + QuestionId + ".js";
    // folderName = "node_student_id_" + StudentId;
    command = "node";
  }
  const filePath = `${__dirname}/compileFiles/${fileName}`;

  const runScript = () => {
    const child = spawn(command, [filePath]);
    child.stdout.on("data", (data) => {
      testResult = data.toString().slice(0, 1);
      console.log("testResult", testResult);
      console.log("testResult", testResult.length);
      if (testResult === "T") {
        console.log("The answer is True");
        // save score
      } else if (testResult === "F") {
        console.log("The answer is False");
        // save score
      }
      // fs.unlink(filePath);
    });
    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    child.on("close", (code) => {
      // fs.unlink(filePath);
    });
  };

  const createFile = async () => {
    try {
      await fs.writeFile(filePath, mergeAnswer);
      runScript();
    } catch (err) {
      console.log(err);
    }
  };

  createFile();
};

const getAllAnswers = asyncHandler(async (req, res) => {
  const { StudentId } = req.params;
  const { questionIds } = req.body;

  const answers = await Promise.all(
    questionIds.map(async (QuestionId) => {
      const answer = await Answer.findOne({
        where: { QuestionId: QuestionId, StudentId: StudentId },
      });

      return answer;
    })
  );

  if (answers) {
    res.json(answers);
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

// ---------- Answer Score API ----------------
const provideScore = asyncHandler(async (req, res) => {
  const { savedAnswers } = req.body;
  try {
    const updatedAnswers = await Promise.all(
      savedAnswers.map(async (answer) => {
        const { answerObj, score, id } = answer;
        const updated = await Answer.update(
          { score: score, answerObj: answerObj },
          { where: { id: id } }
        );
        return updated;
      })
    );
    if (updatedAnswers) {
      res.status(200).send("Updated success!");
    }
  } catch {
    (err) => {
      throw new Error(err);
    };
  }
});

const updateScore = (req, res) => {
  const { id } = req.params;
  const { score } = req.body;

  Answer.update({ score: score }, { where: { id: id } })
    .then(() => {
      res.json({ msg: "This answer's score has been updated." });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

// get all answers from 1 student and 1 quiz
const getQuizScores = asyncHandler(async (req, res) => {
  const { StudentId, QuizId } = req.params;

  const answers = await Answer.findAll({
    where: { QuizId: QuizId, StudentId: StudentId },
  });

  if (answers) {
    res.json(answers);
  } else {
    throw new Error("There is no answer yet.");
  }
});

// get all answers from 1 quiz
const getAllScores = asyncHandler(async (req, res) => {
  const { QuizId } = req.params;
  const answers = await Answer.findAll({ where: { QuizId: QuizId } });
  if (answers) {
    res.json(answers);
  } else {
    throw new Error("There is no answer yet.");
  }
});

const getScore = asyncHandler(async (req, res) => {
  // todo if score haven't provided yet
  const { id } = req.params;
  const answer = await Answer.findOne({ where: { id: id } });
  if (answer) {
    res.json({ score: answer.score });
  } else {
    throw new Error("This answer was not found.");
  }
});

module.exports = {
  createAnswer,
  getAllAnswers,
  getQuizScores,
  getAnswer,
  updateAnswer,
  deleteAnswer,
  provideScore,
  updateScore,
  getAllScores,
  getScore,
};
