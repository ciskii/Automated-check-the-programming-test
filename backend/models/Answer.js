module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    answerObj: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.FLOAT(5, 2),
    },
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Question);
  };

  return Answer;
};
