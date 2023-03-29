/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the model file. */
var Quyen = require("../models/quyenModel.js");

/* The above code is a controller for the Quyen model. It is a set of functions that are called by the
routes.js file. */
exports.quyen_getlist = function (req, res) {
  Quyen.quyen_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.quyen_add = function (req, res) {
  var quyen = req.body;
  Quyen.quyen_add(quyen, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.quyen_getdetail = function (req, res) {
  Quyen.quyen_getdetail(req.params.quyen_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.quyen_update = function (req, res) {
  var quyen = req.body;
  Quyen.quyen_update(req.params.quyen_id, quyen, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.quyen_delete = function (req, res) {
  Quyen.quyen_delete(req.params.quyen_id, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Successfully deleted" });
  });
};
