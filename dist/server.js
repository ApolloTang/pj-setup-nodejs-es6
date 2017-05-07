'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _error = require('./middleware/error.js');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = _bluebird2.default.promisifyAll(require("mongoose"));

// mongoose.Promise = global.Promise;


// -------------- //
// -- mongoose -- //
// -------------- //

// import mongoose from 'mongoose';
mongoose.Promise = _bluebird2.default;

// mongoose.set('error', false);


// Wrap connect in try-catch to prevent error in testing resatart
// ref: http://stackoverflow.com/a/41408315/3136861
try {
  mongoose.connect(_config2.default.db.url);
} catch (err) {
  mongoose.createConnection(_config2.default.db.url);
}

// ------------- //
// -- express -- //
// ------------- //

var app = (0, _express2.default)();
(0, _middleware2.default)(app);
app.use('/api', _api2.default);
app.use((0, _error2.default)());

exports.default = app;