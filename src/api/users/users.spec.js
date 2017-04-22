import request from 'supertest';
import {expect} from 'chai';

const fullPathToServer = process.env.ROOTPATH + '/src/server.js';
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
        name: 'Mufasa',
        age: 100,
        pride: 'Evil users',
        gender:'male'
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
        name: 'test user',
        age: 100,
        pride: 'test user',
        gender:'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var user = resp.body;
        request(app)
          .delete('/api/users/' + user.id)
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
        name: 'test user',
        age: 100,
        pride: 'test user',
        gender:'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var user = resp.body;
        request(app)
          .put('/api/users/' + user.id)
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

