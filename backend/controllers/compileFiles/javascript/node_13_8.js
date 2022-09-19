const a = 10;
const b = 20;
// @params (int, int)
// return int
const studentAnswer = (a, b) => {
  return (a + b)
}
const solution = (a, b) => {
  return a+b
}

if (studentAnswer(a, b) === solution(a, b)) {
  console.log("T")
} else {
  console.log("F")
}