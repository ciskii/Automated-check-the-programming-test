module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    object: {
      type: DataTypes.STRING,
    },
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Quiz);
    Question.hasMany(models.Answer);
  };

  return Question;
};
