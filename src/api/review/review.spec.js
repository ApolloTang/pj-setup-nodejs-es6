import request from 'supertest';
import {expect} from 'chai';

const ROOTPATH = process.env.ROOTPATH;

const fullPathToServer = ROOTPATH + '/src/server.js';
const app = require(fullPathToServer).default;


import Chance from 'chance';
var chance = new Chance();



describe('[users]', function(){
  it(':::: should create a review', function(done) {
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
});

