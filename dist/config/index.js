'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileNameMap = {
  DEV: 'development',
  TEST: 'testing',
  PROD: 'production'
};

var CONSTANTS = {
  DEV: 'DEV',
  TEST: 'TEST',
  PROD: 'PROD'
};

var config = {
  PORT: process.env.PORT || 3000
};

process.env.NODE_ENV = process.env.NODE_ENV || CONSTANTS.DEV;
config.ENV = process.env.NODE_ENV;

var envConfig = void 0;
var configurationFilename = fileNameMap[config.ENV];
try {
  // Require could crush server if the file don't exist.
  var requiredEnvConfig = require('./' + configurationFilename); // Runtime required, cannot use ES6 transpilation
  envConfig = requiredEnvConfig.default || {};
} catch (e) {
  // Fallback to an empty object.
  envConfig = {};
}

exports.default = _extends({}, config, envConfig);