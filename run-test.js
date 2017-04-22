
var util = require('util')
var exec = require('child_process').exec;
var child;

var rootPath = __dirname;
var pathToMocha = './node_modules/.bin/mocha';

child = exec("source ~/.bashrc && ROOTPATH="+rootPath+" "+pathToMocha+" $(find ./src/ -name *spec.js) --compilers js:babel-core/register", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
