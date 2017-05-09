import config from './config';
import logger from './util/logger';
import seedDataBase from './util/seed';


// -------------- //
// -- mongoose -- //
// -------------- //

// import mongoose from 'mongoose';
import bluebird from 'bluebird';
const mongoose = bluebird.promisifyAll(require("mongoose"));

// mongoose.Promise = global.Promise;
mongoose.Promise = bluebird;

// mongoose.set('error', false);


// Wrap connect in try-catch to prevent error in testing resatart
// ref: http://stackoverflow.com/a/41408315/3136861
try {
  mongoose.connect(config.db.url);
} catch (err) {
  mongoose.createConnection(config.db.url);
}

logger.log(config);

seedDataBase();


// ------------- //
// -- express -- //
// ------------- //

import express from 'express';
import middleware from './middleware';
import api from './api';
import error from './middleware/error.js';

const app = express();
middleware(app);
app.use('/api', api);
app.use(error());


export default app;
