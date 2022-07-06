const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentId: String,
  courseId: String,
  quizId: String,
});
