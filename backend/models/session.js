const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const store = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017/session",
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  fName: String,
  lName: String,
  isTeacher: Boolean,
  hash: String,
  salt: String,
});

app.use(
  session({
    secret: "foo",
    store: store,
    resave: false,
    
  })
);
