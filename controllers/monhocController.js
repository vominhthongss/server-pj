/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the monhocModel.js file. */
var MonHoc = require("../models/monhocModel.js");

/* A function that is exported to be used in other files. */
exports.monhoc_getlist = function (req, res) {
  MonHoc.monhoc_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.monhoc_add = function (req, res) {
  var monhoc = req.body;
  MonHoc.monhoc_add(monhoc, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.monhoc_getdetail = function (req, res) {
  MonHoc.monhoc_getdetail(req.params.monhoc_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.monhoc_update = function (req, res) {
  var monhoc = req.body;
  MonHoc.monhoc_update(req.params.monhoc_id, monhoc, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.monhoc_delete = function (req, res) {
  MonHoc.monhoc_delete(req.params.monhoc_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Successfully deleted" });
  });
};
