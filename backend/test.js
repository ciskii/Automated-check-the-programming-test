const { spawn, spawnSync } = require("child_process");
const fs = require("fs/promises");

// const content = `
// class Solution:
// def twoSum(self, nums: List[int], target: int) -> List[int]:
//     for i in range(len(nums)):
//         for j in range(i + 1, len(nums)):
//             if nums[j] == target - nums[i]:
//                 return [i, j]

// x = twoSum()
// print x
// `

const content = `
const nums = [2,7,11,15]
const target = 9
const output = [0,1]

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

const result = twoSum(nums, target)

if (result === output) {
    console.log('T')
} else {
    console.log('F')
}
`;

const fileName = `hello.js`;
const folderName = `python`;
const filePath = `${__dirname}/utils/${folderName}/${fileName}`;

const runScript = () => {
  // run script
  const child = spawn("node", [filePath]);
  let data1;
  child.stdout.on("data", (data) => {
    // data1 = data;
    data1 = data.toString();
    // data1 = parseInt(data);
    // console.log("output", output);
    console.log(`stdout: ${data}`);
    fs.unlink(filePath);
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
