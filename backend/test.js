const { spawn } = require("child_process");
const fs = require("fs/promises");

// wrie file
// const content = `print('Hello from Python')`;
// const fileName = `test.py`;
// const folderName = `python`;
// const filePath = `${__dirname}/utils/${folderName}/${fileName}`;
// fs.writeFile(filePath, content);

const content = `print('Hello from Python')`;
const fileName = `test1.py`;
const folderName = `python`;
const filePath = `${__dirname}/utils/${folderName}/${fileName}`;

const runScript = () => {
  // run script
  const child = spawn("python", [filePath]);
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
    fs.unlink(filePath);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

// write file with promise
const createFile = async () => {
  try {
    await fs.writeFile(filePath, content);
    console.log("Create Success!");
    runScript();
    // ;
  } catch (err) {
    console.log(err);
  }
};

createFile();
