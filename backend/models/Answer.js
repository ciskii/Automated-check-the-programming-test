module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    answerObj: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.FLOAT(5, 2),
      defaultValue: 0,
    },
    answerType: {
      type: DataTypes.TEXT,
    },
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.Student);
  };

  return Answer;
};
