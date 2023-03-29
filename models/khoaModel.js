/* A directive to the JavaScript engine to enable strict mode. */
"user strict";
/* Importing the db.js file. */
var sql = require("./db.js");

var Khoa = function () {};
/* A function to add a new record to the database. */
Khoa.khoa_add = function khoa_add(khoa, result) {
  sql.query(
    "insert into khoa (khoa_ten) values (?)",
    [khoa.khoa_ten],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        res = {
          khoa_id: res.insertId,
          khoa_ten: khoa.khoa_ten,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to get a record from the database. */
Khoa.khoa_getdetail = function khoa_getdetail(khoa_id, result) {
  sql.query(
    "select * from khoa where khoa_id = ? ",
    khoa_id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};
/* This is a function to get a list of records from the database. */
Khoa.khoa_getlist = function khoa_getlist(result) {
  sql.query(
    "select * from khoa order by khoa_douutien asc",
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
/* This is a function to update a record in the database. */
Khoa.khoa_update = function khoa_update(khoa_id, khoa, result) {
  sql.query(
    "update khoa set khoa_ten = ? where khoa_id = ?",
    [khoa.khoa_ten, khoa_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          khoa_id: parseInt(khoa_id),
          khoa_ten: khoa.khoa_ten,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to update a record in the database. */
Khoa.khoa_updatetraffic = function khoa_updatetraffic(khoa_id, result) {
  sql.query(
    "update khoa set khoa_truycap = khoa_truycap+1 where khoa_id = ?",
    [khoa_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          khoa_id: parseInt(khoa_id),
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to delete a record from the database. */
Khoa.khoa_delete = function khoa_delete(khoa_id, result) {
  sql.query(
    "delete from khoa where khoa_id = ?",
    [khoa_id],
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

/* Exporting the Khoa object so that it can be used in other files. */
module.exports = Khoa;
