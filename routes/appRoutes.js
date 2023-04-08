/* Telling the browser to use strict mode. */
"use strict";
var cors = require("cors");

module.exports = function (app) {
  /* *|MARKER_CURSOR|* */
  app.use(cors());
  /* Allowing the server to accept requests from any domain. */
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, x-requested-with"
    );
    /* Calling the next function. */
    next();
  });
  /* Disabling the etag header. */
  app.disable("etag");
  app.get("/src/:filename", (req, res) => {
    const fileName = req.params.filename;
    // Here, you should serve the file content to the response object.
    res.sendFile(__dirname + "/upload/" + fileName);
  });
  /* Requiring the tailieuController.js file. */
  var tailieuController = require("../controllers/tailieuController");
  /**
   * @openapi
   *  tags:
   *  - name: Tài liệu
   *    description: Everything about tailieu
   * /tailieu:
   *   get:
   *     tags:
   *     - Tài liệu
   *     description: Lấy danh sách khoa
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /tailieu/{tailieu_id}:
   *   get:
   *     tags:
   *     - Tài liệu
   *     description: Chi tiết tài liệu
   *     parameters:
   *       - in: path
   *         name: tailieu_id
   *         required: true
   *         description: Mã tài liệu
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /tailieu:
   *   post:
   *     tags:
   *     - Tài liệu
   *     description: Thêm tài liệu
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               monhoc_id:
   *                 type: integer
   *                 description: mã môn học.
   *                 example: 1
   *               nguoidung_tennguoidung:
   *                 type: string
   *                 description: tên người dùng.
   *                 example: nguyenquoctrung
   *               tailieu_ten:
   *                 type: string
   *                 description: tên tài liệu.
   *                 example: Giáo trình toán rời rạc
   *               loaitailieu_id:
   *                 type: integer
   *                 description: mã tài liệu.
   *                 example: 1
   *               tailieu_mota:
   *                 type: string
   *                 description: mô tả.
   *                 example: Kiến thức toán rời rạc
   *               tailieu_ngaydang:
   *                 type: string
   *                 description: ngày đăng tải.
   *                 example: 2012-04-21T18:25:43-05:00
   *               tailieu_duongdan:
   *                 type: string
   *                 description: đường dẫn.
   *                 example: toanroirac.pdf
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /tailieu/{tailieu_id}:
   *   put:
   *     tags:
   *     - Tài liệu
   *     description: Cập nhật tài liệu
   *     parameters:
   *       - in: path
   *         name: tailieu_id
   *         required: true
   *         description: Mã tài liệu
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               monhoc_id:
   *                 type: integer
   *                 description: mã môn học.
   *                 example: 1
   *               nguoidung_tennguoidung:
   *                 type: string
   *                 description: tên người dùng.
   *                 example: nguyenquoctrung
   *               tailieu_ten:
   *                 type: string
   *                 description: tên tài liệu.
   *                 example: Giáo trình toán rời rạc
   *               loaitailieu_id:
   *                 type: integer
   *                 description: mã tài liệu.
   *                 example: 1
   *               tailieu_mota:
   *                 type: string
   *                 description: mô tả.
   *                 example: Kiến thức toán rời rạc
   *               tailieu_ngaydang:
   *                 type: string
   *                 description: ngày đăng tải.
   *                 example: 2012-04-21T18:25:43-05:00
   *               tailieu_duongdan:
   *                 type: string
   *                 description: đường dẫn.
   *                 example: toanroirac.pdf
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /tailieu/{tailieu_id}:
   *   delete:
   *     tags:
   *     - Tài liệu
   *     description: Xoá tài liệu
   *     parameters:
   *       - in: path
   *         name: tailieu_id
   *         required: true
   *         description: Mã tài liệu
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* The above code is defining the routes for the API. */
  app
    .route("/tailieu")
    .get(tailieuController.tailieu_getlist)
    .post(tailieuController.tailieu_add);
  app
    .route("/tailieu/:tailieu_id")
    .get(tailieuController.tailieu_getdetail)
    .put(tailieuController.tailieu_update)
    .delete(tailieuController.tailieu_delete);
  app
    .route("/truycaptailieu/:tailieu_id")
    .put(tailieuController.tailieu_updatetraffic);
  app
    .route("/taixuongtailieu/:tailieu_id")
    .put(tailieuController.tailieu_updatedowload);
  app.route("/duyettailieu/:tailieu_id").put(tailieuController.tailieu_approve);
  /* Requiring the khoaController.js file. */
  var loaitailieuController = require("../controllers/loaitailieuController");
  /**
   * @openapi
   *  tags:
   *  - name: Loại tài liệu
   *    description: Everything about loại tài liệu
   * /loaitailieu:
   *   get:
   *     tags:
   *     - Loại tài liệu
   *     description: Lấy danh sách loại tài liệu
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /loaitailieu/{loaitailieu_id}:
   *   get:
   *     tags:
   *     - Loại tài liệu
   *     description: Chi tiết loại tài liệu
   *     parameters:
   *       - in: path
   *         name: loaitailieu_id
   *         required: true
   *         description: Mã loại tài liệu
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /loaitailieu:
   *   post:
   *     tags:
   *     - Loại tài liệu
   *     description: Thêm loại tài liệu
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               loaitailieu_ten:
   *                 type: string
   *                 description: tên loại tài liệu.
   *                 example: Đề cương
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /loaitailieu/{loaitailieu_id}:
   *   put:
   *     tags:
   *     - Loại tài liệu
   *     description: Cập nhật loại tài liệu
   *     parameters:
   *       - in: path
   *         name: loaitailieu_id
   *         required: true
   *         description: Mã loại tài liệu
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               loaitailieu_ten:
   *                 type: string
   *                 description: tên Loại tài liệu.
   *                 example: Đề cương
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /loaitailieu/{loaitailieu_id}:
   *   delete:
   *     tags:
   *     - Loại tài liệu
   *     description: Xoá loaitailieu
   *     parameters:
   *       - in: path
   *         name: loaitailieu_id
   *         required: true
   *         description: Mã loaitailieu
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* Creating a route for the loaitailieuController. */
  app
    .route("/loaitailieu")
    .get(loaitailieuController.loaitailieu_getlist)
    .post(loaitailieuController.loaitailieu_add);
  app
    .route("/loaitailieu/:loaitailieu_id")
    .get(loaitailieuController.loaitailieu_getdetail)
    .put(loaitailieuController.loaitailieu_update)
    .delete(loaitailieuController.loaitailieu_delete);

var nienkhoaController = require("../controllers/nienkhoaController");
  app
    .route("/nienkhoa")
    .get(nienkhoaController.nienkhoa_getlist)
    .post(nienkhoaController.nienkhoa_add);
  app
    .route("/nienkhoa/:nienkhoa_id")
    .get(nienkhoaController.nienkhoa_getdetail)
    .put(nienkhoaController.nienkhoa_update)
    .delete(nienkhoaController.nienkhoa_delete);

  /**
   * @openapi
   * /upload:
   *   post:
   *     tags:
   *     - Upload
   *     description: Upload tài liệu
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */

  /* Creating a route for the upload of files. */
  app.post("/upload", (req, res) => {
    const { file } = req.files;
    console.log("req.files :", req.files);
    if (!file) return res.sendStatus(400);
    file.mv(__dirname + "/upload/" + file.name);
    res.status(201).json({ url: file.name });
  });
  var binhluanController = require("../controllers/binhluanController");
  app
    .route("/binhluan")
    .get(binhluanController.binhluan_getlist)
    .post(binhluanController.binhluan_add);
  app
    .route("/binhluan/:khoa_id")
    .get(binhluanController.binhluan_getdetail)
    .put(binhluanController.binhluan_update)
    .delete(binhluanController.binhluan_delete);
  /* Requiring the khoaController.js file. */
  var khoaController = require("../controllers/khoaController");
  /**
   * @openapi
   *  tags:
   *  - name: Khoa
   *    description: Everything about khoa
   * /khoa:
   *   get:
   *     tags:
   *     - Khoa
   *     description: Lấy danh sách khoa
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /khoa/{khoa_id}:
   *   get:
   *     tags:
   *     - Khoa
   *     description: Chi tiết khoa
   *     parameters:
   *       - in: path
   *         name: khoa_id
   *         required: true
   *         description: Mã khoa
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /khoa:
   *   post:
   *     tags:
   *     - Khoa
   *     description: Thêm khoa
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               khoa_ten:
   *                 type: string
   *                 description: tên khoa.
   *                 example: Khoa công nghệ thông tin
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /khoa/{khoa_id}:
   *   put:
   *     tags:
   *     - Khoa
   *     description: Cập nhật khoa
   *     parameters:
   *       - in: path
   *         name: khoa_id
   *         required: true
   *         description: Mã khoa
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               khoa_ten:
   *                 type: string
   *                 description: tên khoa.
   *                 example: Khoa công nghệ thông tin
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /khoa/{khoa_id}:
   *   delete:
   *     tags:
   *     - Khoa
   *     description: Xoá khoa
   *     parameters:
   *       - in: path
   *         name: khoa_id
   *         required: true
   *         description: Mã khoa
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* Creating a route for the khoaController. */
  app
    .route("/khoa")
    .get(khoaController.khoa_getlist)
    .post(khoaController.khoa_add);
  app
    .route("/khoa/:khoa_id")
    .get(khoaController.khoa_getdetail)
    .put(khoaController.khoa_update)
    .delete(khoaController.khoa_delete);
  app.route("/truycapkhoa/:khoa_id").put(khoaController.khoa_updatetraffic);

  /* Importing the monhocController.js file. */
  var monhocController = require("../controllers/monhocController");
  /**
   * @openapi
   *  tags:
   *  - name: Môn học
   *    description: Everything about monhoc
   * /monhoc:
   *   get:
   *     tags:
   *     - Môn học
   *     description: Lấy danh sách môn học
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /monhoc/{monhoc_id}:
   *   get:
   *     tags:
   *     - Môn học
   *     description: Chi tiết môn học
   *     parameters:
   *       - in: path
   *         name: monhoc_id
   *         required: true
   *         description: Mã môn học
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /monhoc:
   *   post:
   *     tags:
   *     - Môn học
   *     description: Thêm môn học
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               monhoc_ten:
   *                 type: string
   *                 description: tên môn học.
   *                 example: Toán rời rạc
   *               khoa_id:
   *                 type: string
   *                 description: mã khoa.
   *                 example: 1
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /monhoc/{monhoc_id}:
   *   put:
   *     tags:
   *     - Môn học
   *     description: Cập nhật môn học
   *     parameters:
   *       - in: path
   *         name: monhoc_id
   *         required: true
   *         description: Mã môn học
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               monhoc_ten:
   *                 type: string
   *                 description: tên môn học.
   *                 example: Toán rời rạc
   *               khoa_id:
   *                 type: string
   *                 description: mã khoa.
   *                 example: 1
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /monhoc/{monhoc_id}:
   *   delete:
   *     tags:
   *     - Môn học
   *     description: Xoá môn học
   *     parameters:
   *       - in: path
   *         name: monhoc_id
   *         required: true
   *         description: Mã môn học
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* Creating a route for the monhocController. */
  app
    .route("/monhoc")
    .get(monhocController.monhoc_getlist)
    .post(monhocController.monhoc_add);
  app
    .route("/monhoc/:monhoc_id")
    .get(monhocController.monhoc_getdetail)
    .put(monhocController.monhoc_update)
    .delete(monhocController.monhoc_delete);
  /* Requiring the nguoidungController.js file. */
  var nguoidungController = require("../controllers/nguoidungController");
  /**
   * @openapi
   *  tags:
   *  - name: Người dùng
   *    description: Everything about nguoidung
   * @openapi
   * /nguoidung/{nguoidung_tennguoidung}:
   *   get:
   *     tags:
   *     - Người dùng
   *     description: Thông tin người dùng
   *     parameters:
   *       - in: path
   *         name: nguoidung_tennguoidung
   *         required: true
   *         description: Tên người dùng
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /nguoidung:
   *   post:
   *     tags:
   *     - Người dùng
   *     description: Đăng ký người dùng
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nguoidung_tennguoidung:
   *                 type: string
   *                 description: tên người dùng.
   *                 example: nguyenquoctrung
   *               nguoidung_matkhau:
   *                 type: string
   *                 description: mật khẩu.
   *                 example: nguyenquoctrungx@X
   *               nguoidung_hoten:
   *                 type: string
   *                 description: họ tên người dùng.
   *                 example: Nguyễn Quốc Trung
   *               nguoidung_gioitinh:
   *                 type: string
   *                 description: giới tính
   *                 example: nam
   *               nguoidung_mail:
   *                 type: string
   *                 description: mail.
   *                 example: nguyenquoctrung@mail.com
   *               nguoidung_anhdaidien:
   *                 type: string
   *                 description: ảnh đại diện.
   *                 example: nguyenquoctrung.png
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /nguoidung/{nguoidung_tennguoidung}:
   *   put:
   *     tags:
   *     - Người dùng
   *     description: Cập nhật người dùng
   *     parameters:
   *       - in: path
   *         name: nguoidung_tennguoidung
   *         required: true
   *         description: Tên người dùng
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nguoidung_matkhau:
   *                 type: string
   *                 description: mật khẩu.
   *                 example: nguyenquoctrungx@X
   *               nguoidung_hoten:
   *                 type: string
   *                 description: họ tên người dùng.
   *                 example: Nguyễn Quốc Trung
   *               nguoidung_gioitinh:
   *                 type: string
   *                 description: giới tính
   *                 example: nam
   *               nguoidung_mail:
   *                 type: string
   *                 description: mail.
   *                 example: nguyenquoctrung@mail.com
   *               nguoidung_anhdaidien:
   *                 type: string
   *                 description: ảnh đại diện.
   *                 example: nguyenquoctrung.png
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /nguoidung/{nguoidung_tennguoidung}:
   *   delete:
   *     tags:
   *     - Người dùng
   *     description: Xoá người dùng
   *     parameters:
   *       - in: path
   *         name: nguoidung_tennguoidung
   *         required: true
   *         description: Tên người dùng
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* Creating a route for the nguoidungController. */
  app
    .route("/nguoidung")
    .post(nguoidungController.nguoidung_add)
    .get(nguoidungController.nguoidung_getlist);
  app
    .route("/nguoidung/:nguoidung_tennguoidung")
    .get(nguoidungController.nguoidung_getdetail)
    .put(nguoidungController.nguoidung_update)

    .delete(nguoidungController.nguoidung_delete);

  /**
   * @openapi
   *  tags:
   *  - name: Xác thực
   *    description: Đăng nhập tài khoản
   * /login:
   *   post:
   *     tags:
   *     - Xác thực
   *     description: Đăng nhập
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nguoidung_tennguoidung:
   *                 type: string
   *                 description: tên người dùng.
   *                 example: nguyenquoctrung
   *               nguoidung_matkhau:
   *                 type: string
   *                 description: mật khẩu.
   *                 example: nguyenquoctrungx@X
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* The above code is creating a route for the login page. */
  app.route("/login").post(nguoidungController.nguoidung_login);
  var quantriController = require("../controllers/quantriController");
  /**
   * @openapi
   *  tags:
   *  - name: Quản trị
   *    description: Everything about quantri
   * @openapi
   * /quantri/{quantri_tennguoidung}:
   *   get:
   *     tags:
   *     - Quản trị
   *     description: Thông tin quản trị
   *     parameters:
   *       - in: path
   *         name: quantri_tennguoidung
   *         required: true
   *         description: Tên người dùng
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /quantri:
   *   post:
   *     tags:
   *     - Quản trị
   *     description: Đăng ký người dùng
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               quantri_tennguoidung:
   *                 type: string
   *                 description: tên người dùng.
   *                 example: nguyenquoctrung
   *               quantri_matkhau:
   *                 type: string
   *                 description: mật khẩu.
   *                 example: nguyenquoctrungx@X
   *               quantri_hoten:
   *                 type: string
   *                 description: họ tên người dùng.
   *                 example: Nguyễn Quốc Trung
   *               quantri_gioitinh:
   *                 type: string
   *                 description: giới tính
   *                 example: nam
   *               quantri_mail:
   *                 type: string
   *                 description: mail.
   *                 example: nguyenquoctrung@mail.com
   *               quyen_id:
   *                 type: integer
   *                 description: mã quyền.
   *                 example: 1
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /quantri/{quantri_tennguoidung}:
   *   put:
   *     tags:
   *     - Quản trị
   *     description: Cập nhật người dùng
   *     parameters:
   *       - in: path
   *         name: quantri_tennguoidung
   *         required: true
   *         description: Tên người dùng
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               quantri_matkhau:
   *                 type: string
   *                 description: mật khẩu.
   *                 example: nguyenquoctrungx@X
   *               quantri_hoten:
   *                 type: string
   *                 description: họ tên người dùng.
   *                 example: Nguyễn Quốc Trung
   *               quantri_gioitinh:
   *                 type: string
   *                 description: giới tính
   *                 example: nam
   *               quantri_mail:
   *                 type: string
   *                 description: mail.
   *                 example: nguyenquoctrung@mail.com
   *               quyen_id:
   *                 type: integer
   *                 description: mã quyền
   *                 example: 1
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /quantri/{quantri_tennguoidung}:
   *   delete:
   *     tags:
   *     - Quản trị
   *     description: Xoá người dùng
   *     parameters:
   *       - in: path
   *         name: quantri_tennguoidung
   *         required: true
   *         description: Tên người dùng
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* Creating a route for the quantriController. */
  app.route("/quantri").post(quantriController.quantri_add);
  app
    .route("/quantri/:quantri_tennguoidung")
    .get(quantriController.quantri_getdetail)
    .put(quantriController.quantri_update)
    .delete(quantriController.quantri_delete);
  /**
   * @openapi
   *  tags:
   *  - name: Xác thực quản trị
   *    description: Đăng nhập tài khoản quản trị
   * /admin/login:
   *   post:
   *     tags:
   *     - Xác thực quản trị
   *     description: Đăng nhập
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               quantri_tennguoidung:
   *                 type: string
   *                 description: tên người dùng.
   *                 example: admin
   *               quantri_matkhau:
   *                 type: string
   *                 description: mật khẩu.
   *                 example: nguyenquoctrungx@X
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* The above code is creating a route for the login page. */
  app.route("/admin/login").post(quantriController.quantri_login);
  var quyenController = require("../controllers/quyenController");
  /**
   * @openapi
   *  tags:
   *  - name: Quyền
   *    description: Everything about quyền
   * /quyen:
   *   get:
   *     tags:
   *     - Quyền
   *     description: Lấy danh sách quyền
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /quyen/{quyen_id}:
   *   get:
   *     tags:
   *     - Quyền
   *     description: Chi tiết quyền
   *     parameters:
   *       - in: path
   *         name: quyen_id
   *         required: true
   *         description: Mã quyền
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /quyen:
   *   post:
   *     tags:
   *     - Quyền
   *     description: Thêm quyền
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               quyen_ten:
   *                 type: string
   *                 description: tên quyền.
   *                 example: Đề cương
   *               quyen_noidung:
   *                 type: string
   *                 description: nội dung quyền.
   *                 example: {"View":true,"Update":true,"Delete":true}
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /quyen/{quyen_id}:
   *   put:
   *     tags:
   *     - Quyền
   *     description: Cập nhật quyền
   *     parameters:
   *       - in: path
   *         name: quyen_id
   *         required: true
   *         description: Mã quyền
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               quyen_ten:
   *                 type: string
   *                 description: tên Quyền.
   *                 example: Đề cương
   *               quyen_noidung:
   *                 type: string
   *                 description: nội dung quyền.
   *                 example: {"View":true,"Update":true,"Delete":true}
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   * @openapi
   * /quyen/{quyen_id}:
   *   delete:
   *     tags:
   *     - Quyền
   *     description: Xoá quyen
   *     parameters:
   *       - in: path
   *         name: quyen_id
   *         required: true
   *         description: Mã quyen
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  /* Creating a route for the quyenController. */
  app
    .route("/quyen")
    .get(quyenController.quyen_getlist)
    .post(quyenController.quyen_add);
  app
    .route("/quyen/:quyen_id")
    .get(quyenController.quyen_getdetail)
    .put(quyenController.quyen_update)
    .delete(quyenController.quyen_delete);

  const crypto = require("crypto");
  var sql = require("../models/db.js");
  const nodemailer = require("nodemailer");
  app.post("/forgot-password", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    sql.query(
      "select count(*) as count from nguoidung where nguoidung_tennguoidung = ? and nguoidung_mail = ?",
      [username, email],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
        } else {
          if (res[0].count === 1) {
            const token = crypto.randomBytes(20).toString("hex");
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "vmtsimplify@gmail.com",
                pass: "ftrksjojmdctkhmg",
              },
            });

            const mailOptions = {
              to: email,
              from: "addminnhnueshare@gmail.com",
              subject: "[Hnue Share] Đặt lại mật khẩu",
              text: `Bạn nhận được thông báo này vì bạn (hoặc người khác) đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.\n\n
       Vui lòng nhấp vào liên kết sau hoặc dán liên kết này vào trình duyệt của bạn để hoàn tất quy trình:\n\n
       http://localhost:3000/reset-password/${token}/${username}\n\n
       Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                return res.status(500).send("Error sending email");
              }
              console.log("Email sent: " + info.response);
              res.send("Email sent");
            });
          }
        }
      }
    );
  });

  var nguoidungController = require("../controllers/nguoidungController");
  app
    .route("/reset-password")
    .post(nguoidungController.nguoidung_changepassword);

  var tukhoaController = require("../controllers/tukhoaController");
  app
    .route("/tukhoa")
    .post(tukhoaController.tukhoa_add)
    .get(tukhoaController.tukhoa_getlist);

  var thichController = require("../controllers/thichController");
  app
    .route("/thich")
    .get(thichController.thich_getlist)
    .post(thichController.thich_add);
  app
    .route("/thich/:tailieu_id/:nguoidung_tennguoidung")
    .delete(thichController.thich_delete);
};
