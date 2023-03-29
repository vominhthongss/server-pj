/* A directive to the JavaScript engine to enable strict mode. */
"use strict";

/* Importing the model file. */
var Thich = require("../models/thichModel.js");

exports.thich_add = function (req, res) {
  var thich = req.body;
  Thich.thich_add(thich, function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(model);
  });
};
exports.thich_getlist = function (req, res) {
  Thich.thich_getlist(function (err, model) {
    if (err) return res.status(500).json({ error: err.message });
    res.send(model);
  });
};

exports.thich_delete = function (req, res) {
  Thich.thich_delete(
    req.params.tailieu_id,
    req.params.nguoidung_tennguoidung,
    function (err, model) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Successfully deleted" });
    }
  );
};
