module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    courseID: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
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
