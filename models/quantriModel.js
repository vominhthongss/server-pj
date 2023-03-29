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
var QuanTri = function () {};
/* This function is used to login. */
QuanTri.quantri_login = function quantri_login(quantri, result) {
  sql.query(
    "select * from quantri,quyen where quantri_tennguoidung = ? and quantri.quyen_id=quyen.quyen_id",
    [quantri.quantri_tennguoidung, quantri.quantri_matkhau],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        if (res.length === 0) {
          result({ message: "Check username or password. It's wrong!" }, null);
        } else {
          let password = res[0].quantri_matkhau;
          bcrypt.compare(quantri.quantri_matkhau, password, function (err, rs) {
            if (err) {
              result(err, null);
            } else {
              if (rs) {
                res = {
                  quantri_tennguoidung: res[0].quantri_tennguoidung,
                  quantri_hoten: res[0].quantri_hoten,
                  quantri_gioitinh: res[0].quantri_gioitinh,
                  quantri_mail: res[0].quantri_mail,
                  quyen_id: res[0].quyen_id,
                  quyen_ten: res[0].quyen_ten,
                  quyen_noidung: res[0].quyen_noidung,
                  token: jsonwebtoken.sign(
                    { user: quantri.quantri_tennguoidung },
                    JWT_SECRET
                  ),
                };
                result(null, res);
              } else {
                result(
                  { message: "Check username or password. It's wrong!" },
                  null
                );
              }
            }
          });
        }
      }
    }
  );
};
/* This function is used to add a new user to the database. */
QuanTri.quantri_add = function quantri_add(quantri, result) {
  bcrypt.hash(quantri.quantri_matkhau, 10, function (err, quantri_matkhau) {
    sql.query(
      "INSERT INTO quantri(quantri_tennguoidung, quyen_id, quantri_matkhau, quantri_hoten, quantri_gioitinh, quantri_mail) VALUES (?,?,?,?,?,?)",
      [
        quantri.quantri_tennguoidung,
        quantri.quyen_id,
        quantri_matkhau.toString(),
        quantri.quantri_hoten,
        quantri.quantri_gioitinh,
        quantri.quantri_mail,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          console.log(res.insertId);
          res = {
            quantri_tennguoidung: quantri.quantri_tennguoidung,
            quyen_id: quantri.quyen_id,
            quantri_matkhau: quantri.quantri_matkhau,
            hashPassword: quantri_matkhau.toString(),
            quantri_hoten: quantri.quantri_hoten,
            quantri_gioitinh: quantri.quantri_gioitinh,
            quantri_mail: quantri.quantri_mail,
          };
          result(null, res);
        }
      }
    );
  });
};
/* This function is used to get the user information. */
QuanTri.quantri_getdetail = function quantri_getdetail(
  quantri_tennguoidung,
  result
) {
  sql.query(
    "select * from quantri,quyen where quantri_tennguoidung = ? and quantri.quyen_id=quyen.quyen_id",
    quantri_tennguoidung,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        res = {
          quantri_tennguoidung: res[0].quantri_tennguoidung,
          quyen_id: res[0].quyen_id,
          quantri_hoten: res[0].quantri_hoten,
          quantri_gioitinh: res[0].quantri_gioitinh,
          quantri_mail: res[0].quantri_mail,
          quyen_ten: res[0].quyen_ten,
          quyen_noidung: res[0].quyen_noidung,
        };
        result(null, res);
      }
    }
  );
};

/* This function is used to update the user information. */
QuanTri.quantri_update = function quantri_update(
  quantri_tennguoidung,
  quantri,
  result
) {
  bcrypt.hash(quantri.quantri_matkhau, 10, function (err, quantri_matkhau) {
    sql.query(
      "update quantri set quantri_matkhau=?, quantri_hoten = ?,quantri_gioitinh=?, quantri_mail=?, quyen_id=? where quantri_tennguoidung = ?",
      [
        quantri_matkhau.toString(),
        quantri.quantri_hoten,
        quantri.quantri_gioitinh,
        quantri.quantri_mail,
        quantri.quyen_id,
        quantri_tennguoidung,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          res = {
            quantri_tennguoidung: quantri.quantri_tennguoidung,
            quyen_id: quantri.quyen_id,
            quantri_matkhau: quantri.quantri_matkhau,
            hashPassword: quantri_matkhau.toString(),
            quantri_hoten: quantri.quantri_hoten,
            quantri_gioitinh: quantri.quantri_gioitinh,
            quantri_mail: quantri.quantri_mail,
          };
          result(null, res);
        }
      }
    );
  });
};
/* A function that deletes a user from the database. */
QuanTri.quantri_delete = function quantri_delete(quantri_tennguoidung, result) {
  sql.query(
    "delete from quantri where quantri_tennguoidung= ?",
    [quantri_tennguoidung],
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

/* Exporting the `QuanTri` object so that it can be used in other files. */
module.exports = QuanTri;
