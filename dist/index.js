'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _server = require('./server.js');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(JSON.stringify(_config2.default, null, 4));

_server2.default.listen(_config2.default.PORT);

console.log('listening on http://localhost:' + _config2.default.PORT);