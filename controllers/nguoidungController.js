/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the `nguoidungModel.js` file. */
var NguoiDung = require("../models/nguoidungModel.js");

/* A function that is exported to be used in other files. */
exports.nguoidung_login = function (req, res) {
  var nguoidung = req.body;
  NguoiDung.nguoidung_login(nguoidung, function (err, model) {
    if (err) return res.status(401).json({ error: err.message });
    res.json(model);
  });
};
exports.nguoidung_add = function (req, res) {
  var nguoidung = req.body;
  NguoiDung.nguoidung_add(nguoidung, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.nguoidung_getdetail = function (req, res) {
  NguoiDung.nguoidung_getdetail(
    req.params.nguoidung_tennguoidung,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};

exports.nguoidung_getlist = function (req, res) {
  NguoiDung.nguoidung_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.nguoidung_update = function (req, res) {
  var nguoidung = req.body;
  NguoiDung.nguoidung_update(
    req.params.nguoidung_tennguoidung,
    nguoidung,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};
exports.nguoidung_changepassword = function (req, res) {
  var nguoidung = req.body;
  NguoiDung.nguoidung_changepassword(nguoidung, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.nguoidung_delete = function (req, res) {
  NguoiDung.nguoidung_delete(
    req.params.nguoidung_tennguoidung,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Successfully deleted" });
    }
  );
};
