module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Course);
    Quiz.hasMany(models.Question, {
      onDelete: "CASCADE",
    });
  };

  return Quiz;
};
