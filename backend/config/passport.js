const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const authUser = async (username, password, done) => {
  if (!username || !password) {
    throw new Error("Please add all fields");
  }

  User.findOne({ where: { email: username } })
    .then(async (user) => {
      if (!user) {
        return done(null, false, {
          message: "The email or password are incorrect.",
        });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        // console.log("authUser: ", user);
        return done(null, user);
      } else {
        return done(null, false, {
          message: "The email or password are incorrect.",
        });
      }
    })
    .catch((err) => {
      done(err);
    });
};

passport.use(new LocalStrategy(customFields, authUser));

//user is the user obj. that authenticated
passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);

  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  console.log("---------> Deserialize userId");
  console.log(user);

  User.findByPk(user)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
