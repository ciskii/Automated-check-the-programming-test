module.exports = (sequelize, DataTypes) => {
  const Sentquiz = sequelize.define("Sentquiz", {
    StudentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Student",
        key: "id",
      },
    },
    QuizId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Quiz",
        key: "id",
      },
    },
  });

  return Sentquiz;
};
