import request from 'supertest';
import {expect} from 'chai';

const ROOTPATH = process.env.ROOTPATH;
console.log('ROOTPATH: ', ROOTPATH );

// const fullPathToConfig = ROOTPATH + '/src/config/index.js';
// const config = require(fullPathToConfig).default;
// console.log('user.spect.js config: ',  JSON.stringify(config, null, 4) );

const fullPathToServer = ROOTPATH + '/src/server.js';
const app = require(fullPathToServer).default;


import Chance from 'chance';
var chance = new Chance();



describe('[users]', function(){

  it('should get all users', function(done) {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a user', function(done) {
    request(app)
      .post('/api/users')
      .send({
        name: chance.name()
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      })
  });

  it('should be able to get a users by Id', function(done) {
    request(app)
      .post('/api/users')
      .send({
        name: chance.name()
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var user = resp.body;
        request(app)
          .get('/api/users/' + user._id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(user);
            done();
          });
      })
  });

  it('should return 404 when provide an invalid id', function(done) {
    request(app)
      .get('/api/users/invalid_id')
      .expect(404)
      .end(function(err, resp) {
        done();
      });
  });

  it('should delete a users', function(done) {
    request(app)
      .post('/api/users')
      .send({
        name: chance.name()
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var user = resp.body;
        request(app)
          .delete('/api/users/' + user._id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(user);
            done();
          });
      })
  });

  it('should update a user', function(done) {
    const name_old = chance.name()
    const name_new = chance.name()
    request(app)
      .post('/api/users')
      .send({
        name: name_old
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var user = resp.body;
        request(app)
          .put('/api/users/' + user._id)
          .send({
            name: name_new
          })
          .end(function(err, resp) {
            expect(resp.body.name).to.equal(name_new);
            done();
          });
      })
  });
});

