/* A directive that is used to enable strict mode. */
"user strict";
/* This is a connection to the database. */
var sql = require("./db.js");
/* Used to encrypt the password. */
const bcrypt = require("bcrypt");
/* Used to create a token. */
const jsonwebtoken = require("jsonwebtoken");
/* This is a secret key that is used to encrypt the token. */
const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
var NguoiDung = function () {};
/* This function is used to login. */
NguoiDung.nguoidung_login = function nguoidung_login(nguoidung, result) {
  sql.query(
    "select * from nguoidung where nguoidung_tennguoidung = ?",
    [nguoidung.nguoidung_tennguoidung],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        let password = res[0].nguoidung_matkhau;
        bcrypt.compare(
          nguoidung.nguoidung_matkhau,
          password,
          function (err, rs) {
            if (err) {
              result(err, null);
            } else {
              if (rs) {
                res = {
                  nguoidung_tennguoidung: res[0].nguoidung_tennguoidung,
                  nguoidung_hoten: res[0].nguoidung_hoten,
                  nguoidung_gioitinh: res[0].nguoidung_gioitinh,
                  nguoidung_mail: res[0].nguoidung_mail,
                  nguoidung_ngaysinh: res[0].nguoidung_ngaysinh,
                  nguoidung_anhdaidien: res[0].nguoidung_anhdaidien,
                  token: jsonwebtoken.sign(
                    { user: nguoidung.nguoidung_tennguoidung },
                    JWT_SECRET
                  ),
                };
                result(null, res);
              } else {
                result(null, "Check username or password. It's wrong!");
              }
            }
          }
        );
      }
    }
  );
};
/* This function is used to add a new user to the database. */
NguoiDung.nguoidung_add = function nguoidung_add(nguoidung, result) {
  bcrypt.hash(
    nguoidung.nguoidung_matkhau,
    10,
    function (err, nguoidung_matkhau) {
      sql.query(
        "INSERT INTO nguoidung(nguoidung_tennguoidung, nguoidung_matkhau, nguoidung_hoten, nguoidung_gioitinh, nguoidung_mail,nguoidung_ngaysinh, nguoidung_anhdaidien, khoa_id, nienkhoa_id) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          nguoidung.nguoidung_tennguoidung,
          nguoidung_matkhau.toString(),
          nguoidung.nguoidung_hoten,
          nguoidung.nguoidung_gioitinh,
          nguoidung.nguoidung_mail,
          nguoidung.nguoidung_ngaysinh,
          nguoidung.nguoidung_anhdaidien,
          nguoidung.khoa_id,
          nguoidung.nienkhoa_id,
        ],
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            res = {
              nguoidung_tennguoidung: nguoidung.nguoidung_tennguoidung,
              nguoidung_matkhau: nguoidung.nguoidung_matkhau,
              hashPassword: nguoidung_matkhau.toString(),
              nguoidung_hoten: nguoidung.nguoidung_hoten,
              nguoidung_gioitinh: nguoidung.nguoidung_gioitinh,
              nguoidung_mail: nguoidung.nguoidung_mail,
              nguoidung_ngaysinh: nguoidung.nguoidung_ngaysinh,
              nguoidung_anhdaidien: nguoidung.nguoidung_anhdaidien,
              khoa_id: nguoidung.khoa_id,
              nienkhoa_id: nguoidung.nienkhoa_id,
            };
            result(null, res);
          }
        }
      );
    }
  );
};
NguoiDung.nguoidung_getlist = function nguoidung_getlist(result) {
  sql.query(
    "SELECT * FROM nguoidung  as n, khoa as k, nienkhoa as nk where n.khoa_id=k.khoa_id and n.nienkhoa_id=nk.nienkhoa_id",
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
/* This function is used to get the user information. */
NguoiDung.nguoidung_getdetail = function nguoidung_getdetail(
  nguoidung_tennguoidung,
  result
) {
  sql.query(
    "select * from nguoidung as n, khoa as k, nienkhoa as nk where n.khoa_id=k.khoa_id and n.nienkhoa_id=nk.nienkhoa_id and nguoidung_tennguoidung = ? ",
    nguoidung_tennguoidung,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        res = {
          nguoidung_tennguoidung: res[0].nguoidung_tennguoidung,
          nguoidung_hoten: res[0].nguoidung_hoten,
          nguoidung_gioitinh: res[0].nguoidung_gioitinh,
          nguoidung_mail: res[0].nguoidung_mail,
          nguoidung_ngaysinh: res[0].nguoidung_ngaysinh,
          nguoidung_anhdaidien: res[0].nguoidung_anhdaidien,
          khoa_id: res[0].khoa_id,
          khoa_ten: res[0].khoa_ten,
          nienkhoa_id: res[0].nienkhoa_id,
          nienkhoa_ten: res[0].nienkhoa_ten,
        };
        result(null, res);
      }
    }
  );
};

/* This function is used to update the user information. */
NguoiDung.nguoidung_update = function nguoidung_update(
  nguoidung_tennguoidung,
  nguoidung,
  result
) {
  bcrypt.hash(
    nguoidung.nguoidung_matkhau,
    10,
    function (err, nguoidung_matkhau) {
      sql.query(
        "update nguoidung set  nguoidung_hoten = ?,nguoidung_gioitinh=?, nguoidung_mail=?,nguoidung_ngaysinh=?, nguoidung_anhdaidien=?, khoa_id=?, nienkhoa_id=? where nguoidung_tennguoidung = ?",
        [
          nguoidung.nguoidung_hoten,
          nguoidung.nguoidung_gioitinh,
          nguoidung.nguoidung_mail,
          nguoidung.nguoidung_ngaysinh,
          nguoidung.nguoidung_anhdaidien,
          nguoidung.khoa_id,
          nguoidung.nienkhoa_id,
          nguoidung_tennguoidung,
        ],
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(null, err);
          } else {
            res = {
              nguoidung_tennguoidung: nguoidung.nguoidung_tennguoidung,
              nguoidung_hoten: nguoidung.nguoidung_hoten,
              nguoidung_gioitinh: nguoidung.nguoidung_gioitinh,
              nguoidung_mail: nguoidung.nguoidung_mail,
              nguoidung_ngaysinh: nguoidung.nguoidung_ngaysinh,
              nguoidung_anhdaidien: nguoidung.nguoidung_anhdaidien,
              khoa_id: nguoidung.khoa_id,
              nienkhoa_id: nguoidung.nienkhoa_id,
            };
            result(null, res);
          }
        }
      );
    }
  );
};
NguoiDung.nguoidung_changepassword = function nguoidung_changepassword(
  nguoidung,
  result
) {
  bcrypt.hash(
    nguoidung.nguoidung_matkhau,
    10,
    function (err, nguoidung_matkhau) {
      sql.query(
        "update nguoidung set nguoidung_matkhau=? where nguoidung_tennguoidung = ?",
        [nguoidung_matkhau.toString(), nguoidung.nguoidung_tennguoidung],
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(null, err);
          } else {
            res = {
              nguoidung_tennguoidung: nguoidung.nguoidung_tennguoidung,
              nguoidung_matkhau: nguoidung.nguoidung_matkhau,
              hashPassword: nguoidung_matkhau.toString(),
            };
            result(null, res);
          }
        }
      );
    }
  );
};
// NguoiDung.nguoidung_update = function nguoidung_update(
//   nguoidung_tennguoidung,
//   nguoidung,
//   result
// ) {
//   bcrypt.hash(
//     nguoidung.nguoidung_matkhau,
//     10,
//     function (err, nguoidung_matkhau) {
//       sql.query(
//         "update nguoidung set nguoidung_matkhau=?, nguoidung_hoten = ?,nguoidung_gioitinh=?, nguoidung_mail=?,nguoidung_ngaysinh=?, nguoidung_anhdaidien=? where nguoidung_tennguoidung = ?",
//         [
//           nguoidung_matkhau.toString(),
//           nguoidung.nguoidung_hoten,
//           nguoidung.nguoidung_gioitinh,
//           nguoidung.nguoidung_mail,
//           nguoidung.nguoidung_ngaysinh,
//           nguoidung.nguoidung_anhdaidien,
//           nguoidung_tennguoidung,
//         ],
//         function (err, res) {
//           if (err) {
//             console.log("error: ", err);
//             result(null, err);
//           } else {
//             res = {
//               nguoidung_tennguoidung: nguoidung.nguoidung_tennguoidung,
//               nguoidung_matkhau: nguoidung.nguoidung_matkhau,
//               hashPassword: nguoidung_matkhau.toString(),
//               nguoidung_hoten: nguoidung.nguoidung_hoten,
//               nguoidung_gioitinh: nguoidung.nguoidung_gioitinh,
//               nguoidung_mail: nguoidung.nguoidung_mail,
//               nguoidung_ngaysinh: nguoidung.nguoidung_ngaysinh,
//               nguoidung_anhdaidien: nguoidung.nguoidung_anhdaidien,
//             };
//             result(null, res);
//           }
//         }
//       );
//     }
//   );
// };
/* A function that deletes a user from the database. */
NguoiDung.nguoidung_delete = function nguoidung_delete(
  nguoidung_tennguoidung,
  result
) {
  sql.query(
    "delete from nguoidung where nguoidung_tennguoidung= ?",
    [nguoidung_tennguoidung],
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

/* Exporting the `NguoiDung` object so that it can be used in other files. */
module.exports = NguoiDung;
