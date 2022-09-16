// ~~~~~~~~~~ check the answers ~~~~~~~~~~ //
const checkAnswers = async (StudentId, QuestionId, mergeAnswer, language) => {
  let fileName = "";
  let command = "";
  if (language === "javascript") {
    fileName = "node_" + StudentId + "_" + QuestionId + ".js";
    command = "node";
  }
  const filePath = `${__dirname}/compileFiles/${fileName}`;

  await createFile(filePath, mergeAnswer);
  runScript(command, filePath);
};

const createFile = async (filePath, mergeAnswer) => {
  try {
    await fs.writeFile(filePath, mergeAnswer);
  } catch (err) {
    console.log(err);
  }
};

const runScript = (command, filePath) => {
  let testResult;
  let res;

  const child = spawn(command, [filePath]);
  child.stdout.on("data", (data) => {
    testResult = data.toString().slice(0, 1);
    if (testResult === "T") {
      console.log("The answer is True");
      res = true;
    } else if (testResult === "F") {
      console.log("The answer is False");
      res = false;
    }
  });
  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  child.on("close", (code) => {
    fs.unlink(filePath);
  });
};

// const checkAnswers = async (StudentId, QuestionId, mergeAnswer, language) => {
//   let fileName = "";
//   let command = "";
//   let testResult;
//   if (language === "javascript") {
//     fileName = "node_" + StudentId + "_" + QuestionId + ".js";
//     command = "node";
//   }
//   const filePath = `${__dirname}/compileFiles/${fileName}`;

//   const runScript = () => {
//     const child = spawn(command, [filePath]);
//     child.stdout.on("data", (data) => {
//       testResult = data.toString().slice(0, 1);
//       if (testResult === "T") {
//         console.log("The answer is True");
//       } else if (testResult === "F") {
//         console.log("The answer is False");
//       }
//     });
//     child.stderr.on("data", (data) => {
//       console.error(`stderr: ${data}`);
//     });
//     child.on("close", (code) => {
//       fs.unlink(filePath);
//     });
//   };

//   const createFile = async () => {
//     try {
//       await fs.writeFile(filePath, mergeAnswer);
//       runScript();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   createFile();
// };
