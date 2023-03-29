/* A directive that tells the browser to use strict mode. */
"user strict";
/* Importing the db.js file. */
var sql = require("./db.js");

var MonHoc = function () {};
/* This is a function that adds a row to the database. */
MonHoc.monhoc_add = function monhoc_add(monhoc, result) {
  sql.query(
    "insert into monhoc (monhoc_ten, khoa_id) values (?,?)",
    [monhoc.monhoc_ten, monhoc.khoa_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        res = {
          monhoc_id: res.insertId,
          monhoc_ten: monhoc.monhoc_ten,
          khoa_id: monhoc.khoa_id,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function that gets a row in the database. */
MonHoc.monhoc_getdetail = function monhoc_getdetail(monhoc_id, result) {
  sql.query(
    "select * from monhoc,khoa where monhoc_id = ? and monhoc.khoa_id=khoa.khoa_id ",
    monhoc_id,
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
/* This is a function that gets all the rows in the database. */
MonHoc.monhoc_getlist = function monhoc_getlist(result) {
  sql.query(
    "select * from monhoc, khoa where monhoc.khoa_id=khoa.khoa_id ",
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
/* This is a function that updates a row in the database. */
MonHoc.monhoc_update = function monhoc_update(monhoc_id, monhoc, result) {
  sql.query(
    "update monhoc set monhoc_ten = ?, khoa_id = ? where monhoc_id = ?",
    [monhoc.monhoc_ten, monhoc.khoa_id, monhoc_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          monhoc_id: parseInt(monhoc_id),
          monhoc_ten: monhoc.monhoc_ten,
          khoa_id: monhoc.khoa_id,
        };
        result(null, res);
      }
    }
  );
};
/* A function that deletes a row in the database. */
MonHoc.monhoc_delete = function monhoc_delete(monhoc_id, result) {
  sql.query(
    "delete from monhoc where monhoc_id = ?",
    [monhoc_id],
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

/* Exporting the MonHoc object so that it can be used in other files. */
module.exports = MonHoc;
