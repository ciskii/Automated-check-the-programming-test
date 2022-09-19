// Teacher
const nums = [2, 7, 11, 15];
const target = 9;
const output = [0, 1];
// Student 
// return array of 2 elements of number

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