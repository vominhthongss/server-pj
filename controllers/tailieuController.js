/* A directive to the JavaScript engine to use strict mode. */
"use strict";

/* Importing the model file. */
var TaiLieu = require("../models/tailieuModel.js");

/* The above code is a controller for the TaiLieu model. It is a set of functions that are called by
the routes.js file. */
exports.tailieu_getlist = function (req, res) {
  TaiLieu.tailieu_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.tailieu_add = function (req, res) {
  var tailieu = req.body;
  TaiLieu.tailieu_add(tailieu, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.tailieu_getdetail = function (req, res) {
  TaiLieu.tailieu_getdetail(req.params.tailieu_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.tailieu_update = function (req, res) {
  var tailieu = req.body;
  TaiLieu.tailieu_update(req.params.tailieu_id, tailieu, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.tailieu_approve = function (req, res) {
  TaiLieu.tailieu_approve(req.params.tailieu_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.tailieu_updatetraffic = function (req, res) {
  TaiLieu.tailieu_updatetraffic(req.params.tailieu_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};
exports.tailieu_updatedowload = function (req, res) {
  TaiLieu.tailieu_updatedownload(req.params.tailieu_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.tailieu_delete = function (req, res) {
  TaiLieu.tailieu_delete(req.params.tailieu_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Successfully deleted" });
  });
};
