const twoSum = function (nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    const rest = nums.slice(i + 1);
    for (let j = 0; j < rest.length; j++) {
      if (nums[i] + rest[j] === target) {
        return [i, j + i + 1];
      }
    }
  }
};

const nums = [2, 7, 11, 15];
const target = 9;

// const solution = function (nums, target) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     const rest = nums.slice(i + 1);
//     for (let j = 0; j < rest.length; j++) {
//       if (nums[i] + rest[j] === target) {
//         return [i, j + i + 1];
//       }
//     }
//   }
// };

if (twoSum(nums, target) === solution(nums, target)) {
  console.log("T");
} else {
  console.log("F");
}
