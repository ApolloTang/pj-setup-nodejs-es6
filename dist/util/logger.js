'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // -------------------------
// Modified after Scott Moss
// -------------------------

// colors is attached to String.prototype


var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a noop (no operation) function for when loggin is disabled
var noop = function noop() {};
// check if loggin is enabled in the config
// if it is, then use console.log
// if not then noop
var consoleLog = _config2.default.logging ? console.log.bind(console) : noop;

var logger = {
  log: function log() {
    // arguments is an array like object with all the passed
    // in arguments to this function
    var args = _lodash2.default.toArray(arguments).map(function (arg) {
      if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
        // turn the object to a string so we
        // can log all the properties and color it
        var string = JSON.stringify(arg, 2);
        return string.magenta;
      } else {
        // coerce to string to color
        arg += '';
        return arg.magenta;
      }
    });

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
    consoleLog.apply(console, args);
  }
};

module.exports = logger;