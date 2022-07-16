module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define("Enrollment", {
    StudentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Student",
        key: "id",
      },
    },
    CourseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Course",
        key: "id",
      },
    },
  });

  return Enrollment;
};
