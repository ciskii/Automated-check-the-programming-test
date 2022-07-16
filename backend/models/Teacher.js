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

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Course, {
      onDelete: "CASCADE",
    });
  };

  return Teacher;
};
