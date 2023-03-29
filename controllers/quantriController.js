/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the `quantriModel.js` file. */
var QuanTri = require("../models/quantriModel.js");

/* A function that is exported to be used in other files. */
exports.quantri_login = function (req, res) {
  var quantri = req.body;
  QuanTri.quantri_login(quantri, function (err, model) {
    if (err) return res.status(401).json({ error: err.message });
    res.json(model);
  });
};
exports.quantri_add = function (req, res) {
  var quantri = req.body;
  QuanTri.quantri_add(quantri, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.quantri_getdetail = function (req, res) {
  QuanTri.quantri_getdetail(
    req.params.quantri_tennguoidung,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};

exports.quantri_update = function (req, res) {
  var quantri = req.body;
  QuanTri.quantri_update(
    req.params.quantri_tennguoidung,
    quantri,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};

exports.quantri_delete = function (req, res) {
  QuanTri.quantri_delete(
    req.params.quantri_tennguoidung,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Successfully deleted" });
    }
  );
};
