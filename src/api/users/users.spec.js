const fullPathToServer = process.env.ROOTPATH + '/src/server.js';
const app = require(fullPathToServer);

import {expect} from 'chai';

describe('[users]', function(){

  it('should get all users', function(done) {

    request(app)
      .get('/users')
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
      .post('/users')
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
      .post('/users')
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
          .delete('/users/' + user.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(user);
            done();
          });
      })
  });

  it('should update a user', function(done) {
    request(app)
      .post('/users')
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
          .put('/users/' + user.id)
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


