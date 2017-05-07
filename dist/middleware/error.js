"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return function (err, req, res, next) {
    res.status(500).send("An error has occurred: " + err.message);
  };
};