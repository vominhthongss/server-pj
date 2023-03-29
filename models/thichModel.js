/* A directive to the JavaScript engine to enable strict mode. */
"user strict";
/* Importing the db.js file. */
var sql = require("./db.js");

var Thich = function () {};
/* A function to add a new record to the database. */
Thich.thich_add = function thich_add(thich, result) {
  sql.query(
    "insert into thich (tailieu_id,nguoidung_tennguoidung) values (?,?)",
    [thich.tailieu_id, thich.nguoidung_tennguoidung],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        res = {
          tailieu_id: thich.tailieu_id,
          nguoidung_tennguoidung: thich.nguoidung_tennguoidung,
        };
        result(null, res);
      }
    }
  );
};

Thich.thich_getlist = function thich_getlist(result) {
  sql.query("select * from thich", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

/* This is a function to delete a record from the database. */
Thich.thich_delete = function thich_delete(
  tailieu_id,
  nguoidung_tennguoidung,
  result
) {
  sql.query(
    "delete from thich where tailieu_id = ? and nguoidung_tennguoidung=?",
    [tailieu_id, nguoidung_tennguoidung],
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

/* Exporting the Thich object so that it can be used in other files. */
module.exports = Thich;
