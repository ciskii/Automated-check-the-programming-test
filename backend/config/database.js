const mongoose = require("mongoose");
require("dotenv").config();

// Connect to DB

const connection = mongoose.createConnection(process.env.DB_URL, (err) => {
  if (err) {
    console.log(`Database connect error message: ${err}`);
  }
});

module.exports = connection;
// mongoose.connection.on("error", (err) => {
//   throw new Error(`Mongoose connection error message: ${err}`);
// });
