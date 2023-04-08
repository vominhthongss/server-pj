/* A directive to the JavaScript engine to enable strict mode. */
"user strict";
/* Importing the db.js file. */
var sql = require("./db.js");

var NienKhoa = function () {};
/* A function to add a new record to the database. */
NienKhoa.nienkhoa_add = function nienkhoa_add(nienkhoa, result) {
  sql.query(
    "insert into nienkhoa (nienkhoa_ten) values (?)",
    [nienkhoa.nienkhoa_ten],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        res = {
          nienkhoa_id: res.insertId,
          nienkhoa_ten: nienkhoa.nienkhoa_ten,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to get a record from the database. */
NienKhoa.nienkhoa_getdetail = function nienkhoa_getdetail(
  nienkhoa_id,
  result
) {
  sql.query(
    "select * from nienkhoa where nienkhoa_id = ? ",
    nienkhoa_id,
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
NienKhoa.nienkhoa_getlist = function nienkhoa_getlist(result) {
  sql.query("select * from nienkhoa", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("response : ", res);

      result(null, res);
    }
  });
};
/* This is a function to update a record in the database. */
NienKhoa.nienkhoa_update = function nienkhoa_update(
  nienkhoa_id,
  nienkhoa,
  result
) {
  sql.query(
    "update nienkhoa set nienkhoa_ten = ? where nienkhoa_id = ?",
    [nienkhoa.nienkhoa_ten, nienkhoa_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          nienkhoa_id: parseInt(nienkhoa_id),
          nienkhoa_ten: nienkhoa.nienkhoa_ten,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to delete a record from the database. */
NienKhoa.nienkhoa_delete = function nienkhoa_delete(
  nienkhoa_id,
  result
) {
  sql.query(
    "delete from nienkhoa where nienkhoa_id = ?",
    [nienkhoa_id],
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
module.exports = NienKhoa;
