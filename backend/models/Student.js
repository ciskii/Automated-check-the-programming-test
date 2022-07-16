module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNUll: false,
      valiedate: {
        len: [8, 64],
      },
    },
    fName: {
      type: DataTypes.STRING,
    },
    lName: {
      type: DataTypes.STRING,
    },
  });

  Student.associate = (models) => {
    Student.belongsToMany(models.Course, { through: "Enrollment" });
  };

  return Student;
};
