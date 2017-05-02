import request from 'supertest';
import {expect} from 'chai';

const ROOTPATH = process.env.ROOTPATH;
console.log('ROOTPATH: ', ROOTPATH );

// const fullPathToConfig = ROOTPATH + '/src/config/index.js';
// const config = require(fullPathToConfig).default;
// console.log('user.spect.js config: ',  JSON.stringify(config, null, 4) );

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

