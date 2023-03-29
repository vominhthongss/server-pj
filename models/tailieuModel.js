/* A directive that tells the browser to use strict mode. */
"user strict";
/* Importing the `db.js` file. */
var sql = require("./db.js");

var TaiLieu = function () {};
/* This is a function that adds a row to the table `tailieu` with the values passed in. */
TaiLieu.tailieu_add = function tailieu_add(tailieu, result) {
  sql.query(
    "INSERT INTO tailieu(monhoc_id, nguoidung_tennguoidung, tailieu_ten, loaitailieu_id, tailieu_mota, tailieu_ngaydang, tailieu_duongdan) VALUES (?,?,?,?,?,?,?)",
    [
      tailieu.monhoc_id,
      tailieu.nguoidung_tennguoidung,
      tailieu.tailieu_ten,
      tailieu.loaitailieu_id,
      tailieu.tailieu_mota,
      tailieu.tailieu_ngaydang,
      tailieu.tailieu_duongdan,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        res = {
          tailieu_id: res.insertId,
          monhoc_id: tailieu.monhoc_id,
          nguoidung_tennguoidung: tailieu.nguoidung_tennguoidung,
          tailieu_ten: tailieu.tailieu_ten,
          loaitailieu_id: tailieu.loaitailieu_id,
          tailieu_mota: tailieu.tailieu_mota,
          tailieu_ngaydang: tailieu.tailieu_ngaydang,
          tailieu_duongdan: tailieu.tailieu_duongdan,
        };
        result(null, res);
      }
    }
  );
};
/* This is a function that gets a row in the table `tailieu` where the `tailieu_id` is equal to the
`tailieu_id` passed in. */
TaiLieu.tailieu_getdetail = function tailieu_getdetail(tailieu_id, result) {
  sql.query(
    "select * from tailieu as t,monhoc as m, khoa as k, loaitailieu as l where t.monhoc_id=m.monhoc_id and m.khoa_id=k.khoa_id and l.loaitailieu_id=t.loaitailieu_id and t.tailieu_id = ? ",
    [tailieu_id],
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
/* This is a function that gets all the rows in the table `tailieu` and returns them as an array of
objects. */
// TaiLieu.tailieu_getlist = function tailieu_getlist(result) {
//   sql.query(
//     "SELECT t.*, m.monhoc_ten,k.khoa_id, k.khoa_ten, l.loaitailieu_ten, COUNT(b.binhluan_id) AS so_binhluan FROM tailieu AS t INNER JOIN monhoc AS m ON t.monhoc_id = m.monhoc_id INNER JOIN khoa AS k ON m.khoa_id = k.khoa_id INNER JOIN loaitailieu AS l ON t.loaitailieu_id = l.loaitailieu_id LEFT JOIN binhluan AS b ON t.tailieu_id = b.tailieu_id GROUP BY t.tailieu_id ORDER BY t.tailieu_ngaydang DESC;",
//     function (err, res) {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };
TaiLieu.tailieu_getlist = function tailieu_getlist(result) {
  sql.query(
    "SELECT t.*, m.monhoc_ten,k.khoa_id, k.khoa_ten, l.loaitailieu_ten, COUNT(b.binhluan_id) AS so_binhluan, (SELECT COUNT(*) FROM thich WHERE thich.tailieu_id = t.tailieu_id) AS so_luot_thich FROM tailieu AS t  INNER JOIN monhoc AS m ON t.monhoc_id = m.monhoc_id  INNER JOIN khoa AS k ON m.khoa_id = k.khoa_id INNER JOIN loaitailieu AS l ON t.loaitailieu_id = l.loaitailieu_id LEFT JOIN binhluan AS b ON t.tailieu_id = b.tailieu_id GROUP BY t.tailieu_id ORDER BY t.tailieu_ngaydang DESC;",
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
/* This is a function that updates a row in the table `tailieu` where the `tailieu_id` is equal to the
`tailieu_id` passed in. */
TaiLieu.tailieu_update = function tailieu_update(tailieu_id, tailieu, result) {
  sql.query(
    "update tailieu set monhoc_id=?,nguoidung_tennguoidung=?,tailieu_ten = ?,loaitailieu_id = ?, tailieu_mota=?,tailieu_ngaydang=?,tailieu_duongdan=? where tailieu_id = ?",
    [
      tailieu.monhoc_id,
      tailieu.nguoidung_tennguoidung,
      tailieu.tailieu_ten,
      tailieu.loaitailieu_id,
      tailieu.tailieu_mota,
      tailieu.tailieu_ngaydang,
      tailieu.tailieu_duongdan,
      tailieu_id,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          tailieu_id: parseInt(tailieu_id),
          monhoc_id: tailieu.monhoc_id,
          nguoidung_tennguoidung: tailieu.nguoidung_tennguoidung,
          tailieu_ten: tailieu.tailieu_ten,
          loaitailieu_id: tailieu.loaitailieu_id,
          tailieu_mota: tailieu.tailieu_mota,
          tailieu_ngaydang: tailieu.tailieu_ngaydang,
          tailieu_duongdan: tailieu.tailieu_duongdan,
        };
        result(null, res);
      }
    }
  );
};
TaiLieu.tailieu_updatetraffic = function tailieu_updatetraffic(
  tailieu_id,
  result
) {
  sql.query(
    "update tailieu set tailieu_truycap=tailieu_truycap+1 where tailieu_id = ?",
    [tailieu_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          tailieu_id: parseInt(tailieu_id),
        };
        result(null, res);
      }
    }
  );
};
TaiLieu.tailieu_updatedownload = function tailieu_updatedownload(
  tailieu_id,
  result
) {
  sql.query(
    "update tailieu set tailieu_taixuong=tailieu_taixuong+1 where tailieu_id = ?",
    [tailieu_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        res = {
          tailieu_id: parseInt(tailieu_id),
        };
        result(null, res);
      }
    }
  );
};
/* A function that deletes a row in the table `tailieu` where the `tailieu_id` is equal to the
`tailieu_id` passed in. */
TaiLieu.tailieu_delete = function tailieu_delete(tailieu_id, result) {
  sql.query(
    "delete from tailieu where tailieu_id = ?",
    [tailieu_id],
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

/* Exporting the TaiLieu object so that it can be used in other files. */
module.exports = TaiLieu;
