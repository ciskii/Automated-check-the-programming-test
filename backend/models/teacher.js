const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    courseId: String,
    quizId: String,
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
