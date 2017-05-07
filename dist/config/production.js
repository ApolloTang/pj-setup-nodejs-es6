'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // disbable logging for production
  logging: false,
  db: {
    url: process.env.MONGODB_URI || 'no db.url specified'
    // url : 'testing'
    // url: 'mongodb://apollotang:password@ds133251.mlab.com:33251/sushi'
  }
};