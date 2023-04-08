/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the model file. */
var NienKhoa = require("../models/nienkhoaModel.js");

/* The above code is a controller for the NienKhoa model. It is a set of functions that are called by the
routes.js file. */
exports.nienkhoa_getlist = function (req, res) {
  NienKhoa.nienkhoa_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.nienkhoa_add = function (req, res) {
  var nienkhoa = req.body;
  NienKhoa.nienkhoa_add(nienkhoa, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};

exports.nienkhoa_getdetail = function (req, res) {
  NienKhoa.nienkhoa_getdetail(
    req.params.nienkhoa_id,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};

exports.nienkhoa_update = function (req, res) {
  var nienkhoa = req.body;
  NienKhoa.nienkhoa_update(
    req.params.nienkhoa_id,
    nienkhoa,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json(model);
    }
  );
};

exports.nienkhoa_delete = function (req, res) {
  NienKhoa.nienkhoa_delete(
    req.params.nienkhoa_id,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Successfully deleted" });
    }
  );
};
