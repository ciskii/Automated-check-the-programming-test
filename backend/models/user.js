module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
    role: {
      type: DataTypes.STRING,
      allowNUll: false,
      defaultValue: "student",
      validate: {
        isIn: [["student", "teacher"]],
      },
    },
  });

  return User;
};
