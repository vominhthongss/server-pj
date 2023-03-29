/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the model file. */
var TuKhoa = require("../models/tukhoaModel.js");

/* The above code is a controller for the TuKhoa model. It is a set of functions that are called by the
routes.js file. */
exports.tukhoa_getlist = function (req, res) {
  TuKhoa.tukhoa_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.tukhoa_add = function (req, res) {
  var tukhoa = req.body;
  TuKhoa.tukhoa_add(tukhoa, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};
