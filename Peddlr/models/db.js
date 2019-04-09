const mongoose = require("mongoose");

//copy from CONNECT (MongoDB Atlas)
const dbURI =
 "mongodb+srv://natalieepearson:peddlrapp@cluster0-gwqu8.mongodb.net/test?retryWrites=true";

const options = {
  useNewUrlParser: true,
  dbName: "Peddlr"
};

mongoose.connect(dbURI, options).then(
 () => {
   console.log("Database connection established!");
 },
 err => {
   console.log("Error connecting Database instance due to: ", err);
 }
);

require("./users.js");
require("./listing.js");
require("./category.js");