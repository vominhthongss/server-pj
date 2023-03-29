/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the model file. */
var BinhLuan = require("../models/binhluanModel.js");

/* The above code is a controller for the BinhLuan model. It is a set of functions that are called by the
routes.js file. */
exports.binhluan_getlist = function (req, res) {
  BinhLuan.binhluan_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.binhluan_add = function (req, res) {
  var binhluan = req.body;
  BinhLuan.binhluan_add(binhluan, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.binhluan_getdetail = function (req, res) {
  BinhLuan.binhluan_getdetail(req.params.binhluan_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.binhluan_update = function (req, res) {
  var binhluan = req.body;
  BinhLuan.binhluan_update(
    req.params.binhluan_id,
    binhluan,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};

exports.binhluan_delete = function (req, res) {
  BinhLuan.binhluan_delete(req.params.binhluan_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Successfully deleted" });
  });
};
