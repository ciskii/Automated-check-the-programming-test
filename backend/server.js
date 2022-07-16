const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const { errorHandler, logErrors } = require("./middleware/errorMiddleware");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DB
const db = require("./models");
// const { User } = require("./models");

// !-------------------------------------------------------------------------

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7,
    },
    store: new SequelizeStore({
      db: db.sequelize,
    }),
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session());
require("./config/passport");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use("/api/users", require("./routes/userRoutes"));

app.use(logErrors);
app.use(errorHandler);

db.sequelize.sync().then(() =>
  app.listen(port, () => {
    console.log(`Server started on port ${port}`.blue);
  })
);
