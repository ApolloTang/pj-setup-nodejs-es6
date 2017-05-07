'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _userModel = require('../users/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = function get(req, res, next) {
  _userModel2.default.find({}, 'name').then(function (foundUser) {
    res.json(foundUser);
  }, function (err) {
    next(err);
  });
};

exports.default = { get: get };