import _ from 'lodash';

const fileNameMap = {
  DEV: 'development',
  TEST: 'testing',
  PROD: 'production'
};

const CONSTANTS = {
  DEV: 'DEV',
  TEST: 'TEST',
  PROD: 'PROD',
};

const config = {
    PORT: process.env.PORT || 3000
};

process.env.NODE_ENV = process.env.NODE_ENV || CONSTANTS.DEV;
config.ENV = process.env.NODE_ENV;

let envConfig;
const configurationFilename = fileNameMap[config.ENV];
try {
  // Require could crush server if the file don't exist.
  const requiredEnvConfig = require(`./${configurationFilename}`); // Runtime required, cannot use ES6 transpilation
  envConfig = requiredEnvConfig.default || {};
} catch(e) {
  // Fallback to an empty object.
  envConfig = {};
}

export default {...config, ...envConfig};
