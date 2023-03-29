"user strict";

/* Importing the mysql module. */
var mysql = require("mysql");

/* Creating a connection to the database. */
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kit@2022A",
  database: "db_sharedoc",
});
/* Connecting to the database. */
connection.connect(function (err) {
  if (err) throw err;
});

/* Exporting the connection variable to be used in other files. */
module.exports = connection;
