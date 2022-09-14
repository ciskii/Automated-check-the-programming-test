const { spawn } = require("child_process");
const fs = require("fs/promises");

const content = `
// Teacher
const nums = [2, 7, 11, 15];
const target = 9;
const output = [0, 1];

// Student
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    const rest = nums.slice(i + 1);
    for (let j = 0; j < rest.length; j++) {
      if (nums[i] + rest[j] === target) {
        return [i, j + i + 1];
      }
    }
  }
};

// Teacher
const result = twoSum(nums, target);

let compare = true;

for (let index = 0; index < output.length; index++) {
  if (output[index] !== result[index]) {
    compare = false;
    break;
  }
}

if (compare) {
  console.log("T");
} else {
  console.log("F");
}

`;

const fileName = `hello.js`;
const folderName = `python`;
const filePath = `${__dirname}/utils/${folderName}/${fileName}`;
const newPath = [
  `${__dirname}/utils/${folderName}/hello1.js`,
  `${__dirname}/utils/${folderName}/hello2.js`,
  `${__dirname}/utils/${folderName}/hello3.js`,
];

console.log("newPath", newPath);
console.log("filePath", filePath);
const runScript = () => {
  // run script
  const child = spawn("node", [filePath]);
  let data1;
  child.stdout.on("data", (data) => {
    data1 = data.toString().slice(0, 1);
    console.log("data1.length", data1.length);
    console.log("data1", data1);
    if (data1 === "T") {
      console.log("this answer is correct");
    } else if (data1 === "F") {
      console.log("this answer is false");
    }
    // console.log("data1", data1);
    // console.log("data1.length", data1.length);
    // fs.unlink(filePath);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    console.log("data1", data1);
    // console.log("typeof data1", typeof data1);
  });
};

// write file with promise
const createFile = async (usePath) => {
  try {
    await fs.writeFile(usePath, content);
    console.log("Create Success!");
    runScript();
  } catch (err) {
    console.log(err);
  }
};

for (let i = 0; i < 3; i++) {
  createFile(newPath[i]);
}
