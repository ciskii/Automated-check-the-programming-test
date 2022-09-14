module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isRelease: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deadLineTime: {
      type: DataTypes.DATE,
    },
  });

  Quiz.associate = (models) => {
    Quiz.belongsToMany(models.Student, { through: models.Sentquiz });
    Quiz.belongsTo(models.Course);
    Quiz.hasMany(models.Question, {
      onDelete: "CASCADE",
    });
    Quiz.hasMany(models.Answer, {
      onDelete: "CASCADE",
    });
  };

  return Quiz;
};
