// const mongoose = require("mongoose");
// const User = require("./User");

// mongoose.connect("mongodb://localhost/testdb");

// const run = async () => {
//   // const user = new User({ name: "Jay", age: 25 });
//   // await user.save();
//   const user = await User.create({
//     name: "Shawn",
//     age: 30,
//     artist: ["Joji", "Drake"],
//   });
//   console.log(user);
// };

// run();

const express = require("express");
const session = require("express-session");

const app = express();

// Use the session middleware
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

// Access the session as req.session
app.get("/", function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
