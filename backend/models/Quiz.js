module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    name: {
      type: DataTypes.STRING,
    },
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Course);
    Quiz.hasMany(models.Question);
  };

  return Quiz;
};
