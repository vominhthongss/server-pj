/* A directive to the JavaScript engine to enable strict mode. */
"user strict";
/* Importing the db.js file. */
var sql = require("./db.js");

var Quyen = function () {};
/* A function to add a new record to the database. */
Quyen.quyen_add = function quyen_add(quyen, result) {
  sql.query(
    "insert into quyen (quyen_ten,quyen_noidung) values (?,?)",
    [quyen.quyen_ten],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        res = {
          quyen_id: res.insertId,
          quyen_ten: quyen.quyen_ten,
          quyen_noidung: quyen.quyen_noidung,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to get a record from the database. */
Quyen.quyen_getdetail = function quyen_getdetail(
  quyen_id,
  result
) {
  sql.query(
    "select * from quyen where quyen_id = ? ",
    quyen_id,
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
Quyen.quyen_getlist = function quyen_getlist(result) {
  sql.query("select * from quyen", function (err, res) {
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
Quyen.quyen_update = function quyen_update(
  quyen_id,
  quyen,
  result
) {
  sql.query(
    "update quyen set quyen_ten = ?, quyen_noidung = ? where quyen_id = ?",
    [quyen.quyen_ten,quyen.quyen_noidung, quyen_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          quyen_id: parseInt(quyen_id),
          quyen_ten: quyen.quyen_ten,
          quyen_noidung: quyen.quyen_noidung,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function to delete a record from the database. */
Quyen.quyen_delete = function quyen_delete(
  quyen_id,
  result
) {
  sql.query(
    "delete from quyen where quyen_id = ?",
    [quyen_id],
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
module.exports = Quyen;
