const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const authUser = async (username, password, done) => {
  if (!username || !password) {
    throw new Error("Please add all fields");
  }

  User.findOne({ email: username })
    .then(async (user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        // console.log("authUser: ", user);
        return done(null, user);
      } else {
        return done(null, false);
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

  User.findById(user)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
