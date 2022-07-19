module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
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

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Course, {
      onDelete: "CASCADE",
    });
  };

  return Teacher;
};
