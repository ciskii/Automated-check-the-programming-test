const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected".blue);
  })
  .catch((err) => console.log(`Database connect error message: ${err}`));

mongoose.connection.on("error", (err) => {
  throw new Error(`Mongoose connection error message: ${err}`);
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session());

require("./config/passport");

let count = 1;
const printData = (req, res, next) => {
  console.log("\n==============================");
  console.log(`------------>  ${count++}`);

  console.log(`req.body.username -------> ${req.body.email}`);
  console.log(`req.body.password -------> ${req.body.password}`);

  console.log(`\n req.session.passport -------> `);
  console.log(req.session.passport);

  console.log(`\n req.user -------> `);
  console.log(req.user);

  console.log("\n Session and Cookie");
  console.log(`req.session.id -------> ${req.session.id}`);
  console.log(`req.session.cookie -------> `);
  console.log(req.session.cookie);

  console.log("===========================================\n");

  next();
};

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("req.session", req.session);
  console.log("req.user", req.user);
  next();
});
// app.use("/api/users", printData, require("./routes/userRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`.blue);
});
