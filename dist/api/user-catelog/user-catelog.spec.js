'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOTPATH = process.env.ROOTPATH;
console.log('ROOTPATH: ', ROOTPATH);

// const fullPathToConfig = ROOTPATH + '/src/config/index.js';
// const config = require(fullPathToConfig).default;
// console.log('user.spect.js config: ',  JSON.stringify(config, null, 4) );

var fullPathToServer = ROOTPATH + '/src/server.js';
var app = require(fullPathToServer).default;

describe('[userCatelog]', function () {
  it('should get a catelog of user', function (done) {
    (0, _supertest2.default)(app).get('/api/userCatelog').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, resp) {
      (0, _chai.expect)(resp.body).to.be.an('array');
      done();
    });
  });
});