/* A directive to the JavaScript engine to enable strict mode. */
"user strict";
/* Importing the db.js file. */
var sql = require("./db.js");

var TuKhoa = function () {};
/* A function to add a new record to the database. */
TuKhoa.tukhoa_add = function tukhoa_add(tukhoa, result) {
  sql.query(
    "insert into tukhoa (tukhoa_noidung) values (?)",
    [tukhoa.tukhoa_noidung],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        res = {
          tukhoa_id: res.insertId,
          tukhoa_noidung: tukhoa.tukhoa_noidung,
        };
        result(null, res);
      }
    }
  );
};

/* This is a function to get a list of records from the database. */
TuKhoa.tukhoa_getlist = function tukhoa_getlist(result) {
  sql.query(
    "SELECT tukhoa_noidung, COUNT(*) as count FROM tukhoa GROUP BY tukhoa_noidung ORDER BY count DESC limit 10;",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

/* Exporting the TuKhoa object so that it can be used in other files. */
module.exports = TuKhoa;
