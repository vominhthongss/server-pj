/* A directive to the JavaScript engine to enable strict mode. */
"user strict";
/* Importing the db.js file. */
var sql = require("./db.js");

var BinhLuan = function () {};
/* A function to add a new record to the database. */
BinhLuan.binhluan_add = function binhluan_add(binhluan, result) {
  sql.query(
    "insert into binhluan (binhluan_noidung,nguoidung_tennguoidung,tailieu_id) values (?,?,?)",
    [
      binhluan.binhluan_noidung,
      binhluan.nguoidung_tennguoidung,
      binhluan.tailieu_id,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        res = {
          binhluan_id: res.insertId,
          binhluan_noidung: binhluan.binhluan_noidung,
        };
        result(null, res);
      }
    }
  );
};
// BinhLuan.binhluan_add = function binhluan_add(binhluan, result) {
//   sql.query(
//     "INSERT INTO binhluan JOIN nguoidung ON binhluan.nguoidung_tennguoidung = nguoidung.nguoidung_tennguoidung (binhluan_noidung, nguoidung_tennguoidung, tailieu_id) VALUES (?, ?, ?) SELECT binhluan.binhluan_id, binhluan.binhluan_noidung, nguoidung.* FROM binhluan",
//     [
//       binhluan.binhluan_noidung,
//       binhluan.nguoidung_tennguoidung,
//       binhluan.tailieu_id,
//     ],
//     function (err, res) {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//       } else {
//         result(null, res[0]);
//       }
//     }
//   );
// };

/* This is a function to get a record from the database. */
BinhLuan.binhluan_getdetail = function binhluan_getdetail(binhluan_id, result) {
  sql.query(
    "select * from binhluan where binhluan_id = ? ",
    binhluan_id,
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
BinhLuan.binhluan_getlist = function binhluan_getlist(result) {
  sql.query(
    "select * from binhluan as b,nguoidung as n where b.nguoidung_tennguoidung=n.nguoidung_tennguoidung order by binhluan_id desc ",
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
BinhLuan.binhluan_update = function binhluan_update(
  binhluan_id,
  binhluan,
  result
) {
  sql.query(
    "update binhluan set binhluan_noidung = ? where binhluan_id = ?",
    [binhluan.binhluan_noidung, binhluan_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          binhluan_id: parseInt(binhluan_id),
          binhluan_noidung: binhluan.binhluan_noidung,
        };
        result(null, res);
      }
    }
  );
};

/* This is a function to delete a record from the database. */
BinhLuan.binhluan_delete = function binhluan_delete(binhluan_id, result) {
  sql.query(
    "delete from binhluan where binhluan_id = ?",
    [binhluan_id],
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

/* Exporting the BinhLuan object so that it can be used in other files. */
module.exports = BinhLuan;
