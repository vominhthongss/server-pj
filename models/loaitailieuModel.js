/* A directive to the JavaScript engine to enable strict mode. */
"user strict";
/* Importing the db.js file. */
var sql = require("./db.js");

var LoaiTaiLieu = function () {};
/* A function to add a new record to the database. */
LoaiTaiLieu.loaitailieu_add = function loaitailieu_add(loaitailieu, result) {
  sql.query(
    "insert into loaitailieu (loaitailieu_ten) values (?)",
    [loaitailieu.loaitailieu_ten],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        res = {
          loaitailieu_id: res.insertId,
          loaitailieu_ten: loaitailieu.loaitailieu_ten,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to get a record from the database. */
LoaiTaiLieu.loaitailieu_getdetail = function loaitailieu_getdetail(
  loaitailieu_id,
  result
) {
  sql.query(
    "select * from loaitailieu where loaitailieu_id = ? ",
    loaitailieu_id,
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
LoaiTaiLieu.loaitailieu_getlist = function loaitailieu_getlist(result) {
  sql.query("select * from loaitailieu", function (err, res) {
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
LoaiTaiLieu.loaitailieu_update = function loaitailieu_update(
  loaitailieu_id,
  loaitailieu,
  result
) {
  sql.query(
    "update loaitailieu set loaitailieu_ten = ? where loaitailieu_id = ?",
    [loaitailieu.loaitailieu_ten, loaitailieu_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          loaitailieu_id: parseInt(loaitailieu_id),
          loaitailieu_ten: loaitailieu.loaitailieu_ten,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to delete a record from the database. */
LoaiTaiLieu.loaitailieu_delete = function loaitailieu_delete(
  loaitailieu_id,
  result
) {
  sql.query(
    "delete from loaitailieu where loaitailieu_id = ?",
    [loaitailieu_id],
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
module.exports = LoaiTaiLieu;
