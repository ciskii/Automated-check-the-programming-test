module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    questionObj: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    params: {
      type: DataTypes.TEXT,
    },
    student: {
      type: DataTypes.TEXT,
    },
    solution: {
      type: DataTypes.TEXT,
    },
    language: {
      type: DataTypes.TEXT,
    },
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Quiz);
    Question.hasMany(models.Answer, {
      onDelete: "CASCADE",
    });
  };

  return Question;
};
