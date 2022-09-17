module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    questionObj: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    params: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    student: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    solution: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    language: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    questionNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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
