const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Student, Teacher } = require("../models");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const authUser = async (username, password, done) => {
  if (!username || !password) {
    throw new Error("Please add all fields");
  }

  const findTeacher = async () => {
    const user = await Teacher.findOne({ where: { email: username } });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        user.role = "teacher";
        return user;
      } else {
        return null;
      }
    } else return null;
  };

  const findStudent = async () => {
    const user = await Student.findOne({ where: { email: username } });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        user.role = "student";
        return user;
      } else {
        return null;
      }
    } else return null;
  };

  const teacher = await findTeacher();
  const student = await findStudent();

  if (teacher) {
    done(null, teacher);
  } else if (student) {
    done(null, student);
  } else {
    done(null, false, { message: "The email or password are incorrect." });
  }
};

passport.use(new LocalStrategy(customFields, authUser));

passport.serializeUser((user, done) => {
  // console.log(`--------> Serialize User`);
  // console.log("user", user);
  done(null, user.id);
});

passport.deserializeUser(async (user, done) => {
  // console.log("---------> Deserialize userId");
  // console.log(`userId ${user}`);

  const findTeacher = async () => {
    return await Teacher.findByPk(user);
  };
  const findStudent = async () => {
    return await Student.findByPk(user);
  };

  const teacher = await findTeacher();

  if (teacher) {
    done(null, teacher);
  } else {
    const student = findStudent();
    if (student) {
      done(null, student);
    } else done(new Error("deserializeUser error"));
  }
});
