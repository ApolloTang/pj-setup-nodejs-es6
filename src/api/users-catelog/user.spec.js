import request from 'supertest';
import {expect} from 'chai';

const ROOTPATH = process.env.ROOTPATH;
console.log('ROOTPATH: ', ROOTPATH );

// const fullPathToConfig = ROOTPATH + '/src/config/index.js';
// const config = require(fullPathToConfig).default;
// console.log('user.spect.js config: ',  JSON.stringify(config, null, 4) );

const fullPathToServer = ROOTPATH + '/src/server.js';
const app = require(fullPathToServer).default;

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
        name: 'Mufasa'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      })
  });

  it('should delete a users', function(done) {
    request(app)
      .post('/api/users')
      .send({
        name: 'test user'
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
    request(app)
      .post('/api/users')
      .send({
        name: 'test user'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var user = resp.body;
        request(app)
          .put('/api/users/' + user._id)
          .send({
            name: 'new name'
          })
          .end(function(err, resp) {
            expect(resp.body.name).to.equal('new name');
            done();
          });
      })
  });
});

