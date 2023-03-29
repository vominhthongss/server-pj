/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the model file. */
var Khoa = require("../models/khoaModel.js");

/* The above code is a controller for the Khoa model. It is a set of functions that are called by the
routes.js file. */
exports.khoa_getlist = function (req, res) {
  Khoa.khoa_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.khoa_add = function (req, res) {
  var khoa = req.body;
  Khoa.khoa_add(khoa, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.khoa_getdetail = function (req, res) {
  Khoa.khoa_getdetail(req.params.khoa_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.khoa_update = function (req, res) {
  var khoa = req.body;
  Khoa.khoa_update(req.params.khoa_id, khoa, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.khoa_updatetraffic = function (req, res) {
  Khoa.khoa_updatetraffic(req.params.khoa_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.khoa_delete = function (req, res) {
  Khoa.khoa_delete(req.params.khoa_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Successfully deleted" });
  });
};
