/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the model file. */
var LoaiTaiLieu = require("../models/loaitailieuModel.js");

/* The above code is a controller for the LoaiTaiLieu model. It is a set of functions that are called by the
routes.js file. */
exports.loaitailieu_getlist = function (req, res) {
  LoaiTaiLieu.loaitailieu_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.loaitailieu_add = function (req, res) {
  var loaitailieu = req.body;
  LoaiTaiLieu.loaitailieu_add(loaitailieu, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.loaitailieu_getdetail = function (req, res) {
  LoaiTaiLieu.loaitailieu_getdetail(
    req.params.loaitailieu_id,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};

exports.loaitailieu_update = function (req, res) {
  var loaitailieu = req.body;
  LoaiTaiLieu.loaitailieu_update(
    req.params.loaitailieu_id,
    loaitailieu,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};

exports.loaitailieu_delete = function (req, res) {
  LoaiTaiLieu.loaitailieu_delete(
    req.params.loaitailieu_id,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Successfully deleted" });
    }
  );
};
