'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOTPATH = process.env.ROOTPATH;
console.log('ROOTPATH: ', ROOTPATH);

// const fullPathToConfig = ROOTPATH + '/src/config/index.js';
// const config = require(fullPathToConfig).default;
// console.log('user.spect.js config: ',  JSON.stringify(config, null, 4) );

var fullPathToServer = ROOTPATH + '/src/server.js';
var app = require(fullPathToServer).default;

var chance = new _chance2.default();

describe('[users]', function () {

  it(':::: should get all users', function (done) {
    (0, _supertest2.default)(app).get('/api/users').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, resp) {
      (0, _chai.expect)(resp.body).to.be.an('array');
      done();
    });
  });

  it(':::: should create a user', function (done) {
    (0, _supertest2.default)(app).post('/api/users').send({
      name: chance.name()
    }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, resp) {
      (0, _chai.expect)(resp.body).to.be.an('object');
      done();
    });
  });

  it(':::: should be able to get a users by Id', function (done) {
    (0, _supertest2.default)(app).post('/api/users').send({
      name: chance.name()
    }).set('Accept', 'application/json').end(function (err, resp) {
      var user = resp.body;
      (0, _supertest2.default)(app).get('/api/users/' + user._id).end(function (err, resp) {
        (0, _chai.expect)(resp.body).to.eql(user);
        done();
      });
    });
  });

  it(':::: should return 404 when provide an invalid id', function (done) {
    (0, _supertest2.default)(app).get('/api/users/invalid_id').expect(404).end(function (err, resp) {
      (0, _chai.expect)(resp.status).to.eql(404);
      done();
    });
  });

  it(':::: should return 404 when provide id that does not exist', function (done) {
    (0, _supertest2.default)(app).get('/api/users/111111111111111111111111').expect(404).end(function (err, resp) {
      (0, _chai.expect)(resp.status).to.eql(404);
      done();
    });
  });

  it(':::: should delete a users', function (done) {
    (0, _supertest2.default)(app).post('/api/users').send({
      name: chance.name()
    }).set('Accept', 'application/json').end(function (err, resp) {
      var user = resp.body;
      (0, _supertest2.default)(app).delete('/api/users/' + user._id).end(function (err, resp) {
        (0, _chai.expect)(resp.body).to.eql(user);
        done();
      });
    });
  });

  it(':::: should update a user', function (done) {
    var name_old = chance.name();
    var name_new = chance.name();
    (0, _supertest2.default)(app).post('/api/users').send({
      name: name_old
    }).set('Accept', 'application/json').end(function (err, resp) {
      var user = resp.body;
      (0, _supertest2.default)(app).put('/api/users/' + user._id).send({
        name: name_new
      }).end(function (err, resp) {
        (0, _chai.expect)(resp.body.name).to.equal(name_new);
        done();
      });
    });
  });
});