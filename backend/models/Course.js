module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Course.associate = (models) => {
    Course.belongsTo(models.Teacher);
    Course.hasMany(models.Quiz, {
      onDelete: "CASCADE",
    });

    Course.belongsToMany(models.Student, { through: models.Enrollment });
  };

  return Course;
};
