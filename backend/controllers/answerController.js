const asyncHandler = require("express-async-handler");
const { Answer, Sentquiz } = require("../models");

const { spawn, spawnSync, execFile, exec } = require("child_process");
const fs = require("fs/promises");

// ~~~~~~~~~~~~ Answer obj API ~~~~~~~~~~~ //
const createAnswer = asyncHandler(async (req, res) => {
  const { savedAnswers, StudentId, QuizId } = req.body;

  const answers = await Promise.all(
    savedAnswers.map(async (answer) => {
      const { QuestionId, answerObj, mergeAnswer, language } = answer;
      let score = 0;

      const testResult = await checkAnswers(
        StudentId,
        QuestionId,
        mergeAnswer,
        language
      );

      if (testResult) {
        score = 1;
      } else {
        score = 0;
      }

      const savedAnswer = await Answer.create({
        answerObj: answerObj,
        score: score,
        isCorrect: testResult,
        QuestionId: QuestionId,
        StudentId: StudentId,
        QuizId: QuizId,
      });

      return savedAnswer;
    })
  );

  if (answers) {
    const sentQuizRes = await Sentquiz.create({
      StudentId: StudentId,
      QuizId: QuizId,
    });
    res.json({ savedAnswers, StudentId, QuizId });
  }

  // res.json({ savedAnswers, StudentId, QuizId });
});

// ~~~~~~~~~~ check the answers ~~~~~~~~~~ //
const checkAnswers = async (StudentId, QuestionId, mergeAnswer, language) => {
  let fileName = "";
  let command = "";
  if (language === "javascript") {
    fileName = "node_" + StudentId + "_" + QuestionId + ".js";
    command = "node";
  } else if (language === "python") {
    fileName = "python_" + StudentId + "_" + QuestionId + ".py";
    command = "python";
  } else if (language === "php") {
    fileName = "php_" + StudentId + "_" + QuestionId + ".php";
    command = "php";
  }

  const filePath = `${__dirname}/compileFiles/${language}/${fileName}`;
  await createFile(filePath, mergeAnswer);

  const res = await runScript(command, filePath);
  return res;

  // let fileExtension = "";
  // else if (language === "c") {
  //   fileName = "c_" + StudentId + "_" + QuestionId + ".c";
  //   fileExtension = "c_" + StudentId + "_" + QuestionId;
  //   command = "gcc";
  // } else if (language === "cpp") {
  //   fileName = "cpp_" + StudentId + "_" + QuestionId + ".cpp";
  //   fileExtension = "cpp_" + StudentId + "_" + QuestionId;
  //   command = "g++";
  // }

  // if (language === "cpp" || language === "c") {
  //   const fileExtensionPath = `${__dirname}/compileFiles/${language}/${fileExtension}`;
  //   const filePathC = `${__dirname}/compileFiles/${language}/${fileName}`;
  //   const compilePath =
  //     command + " " + filePathC + " " + "-o" + " " + fileExtensionPath;
  //   const child = spawnSync(compilePath);

  // } else {

  // }
};

// const compileC = (command, filePathC, fileExtensionPath) => {
//   child.on("close", (code) => {
//     if (code !== 0) {
//     }
//     // fs.unlink(filePath);
//   });
// };

// const runScriptC = (fileExtensionPath) => {
//   return new Promise((resolve, reject) => {
//     let testResult;
//     let res;

//     const child = spawn(fileExtensionPath);
//     child.stdout.on("data", (data) => {
//       testResult = data.toString().slice(0, 1);
//       // console.log("testResult", testResult);
//       if (testResult === "T") {
//         res = true;
//       } else if (testResult === "F") {
//         res = false;
//       }
//     });
//     child.stderr.on("data", (data) => {
//       console.error(`stderr: ${data}`);
//     });
//     child.on("close", (code) => {
//       if (code !== 0) {
//         return reject(`Program died with ${code}`);
//       }
//       // fs.unlink(filePath);
//       resolve(res);
//     });
//   });
// };

const createFile = async (filePath, mergeAnswer) => {
  try {
    await fs.writeFile(filePath, mergeAnswer);
  } catch (err) {
    console.log(err);
  }
};

// ! what a step
// * make function promise if they can't return anything
// https://stackoverflow.com/questions/69704190/node-child-process-spawn-is-not-returning-data-correctly-when-using-with-funct
const runScript = (command, filePath) => {
  return new Promise((resolve, reject) => {
    let testResult;
    let res;

    // console.log("command", command);

    const child = spawn(command, [filePath]);
    child.stdout.on("data", (data) => {
      testResult = data.toString().slice(0, 1);
      console.log("testResult", testResult);
      if (testResult === "T") {
        res = true;
      } else if (testResult === "F") {
        res = false;
      }
    });
    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    child.on("close", (code) => {
      if (code !== 0) {
        return reject(`Program died with ${code}`);
      }
      fs.unlink(filePath);
      resolve(res);
    });
  });
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
    console.log("answers", answers);
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
