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
      validate: {
        len: [8, 64],
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Student.associate = (models) => {
    Student.belongsToMany(models.Course, { through: models.Enrollment });
    Student.hasMany(models.Answer, {
      onDelete: "CASCADE",
    });
  };

  return Student;
};
