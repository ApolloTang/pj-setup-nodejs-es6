import request from 'supertest';
import {expect} from 'chai';

const ROOTPATH = process.env.ROOTPATH;

const fullPathToServer = ROOTPATH + '/src/server.js';
const app = require(fullPathToServer).default;

describe('[userCatelog]', function(){
  it('should get a catelog of user', function(done) {
    request(app)
      .get('/api/userCatelog')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });
});

