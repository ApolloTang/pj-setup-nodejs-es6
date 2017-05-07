'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('../../util/logger');

var _logger2 = _interopRequireDefault(_logger);

var _createRoutes = require('../../util/create-routes');

var _createRoutes2 = _interopRequireDefault(_createRoutes);

var _userController = require('./user-controller');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

(0, _createRoutes2.default)(_userController2.default, router);

exports.default = router;