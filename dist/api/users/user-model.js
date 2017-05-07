'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// export default mongoose.model('user', UserSchema);


// Wrap model creation in try-catch to prevent error in testing resatart
// ref:
// https://groups.google.com/forum/?fromgroups=#!topic/mongoose-orm/PXTjqqpaDFk
try {
  var model = _mongoose2.default.model('user');
} catch (err) {
  var model = _mongoose2.default.model('user', UserSchema);
}

exports.default = model;