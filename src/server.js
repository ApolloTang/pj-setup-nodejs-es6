import express from 'express';
import mongoose from 'mongoose';

import config from './config';
import middleware from './middleware';
import api from './api';
import error from './middleware/error.js';

const app = express();
mongoose.Promise = global.Promise;


// Wrap connect in try-catch to prevent error in testing resatart
// ref: http://stackoverflow.com/a/41408315/3136861
try {
  mongoose.connect(config.db.url);
} catch (err) {
  mongoose.createConnection(config.db.url);
}


middleware(app);

app.use('/api', api);

app.use(error());

export default app;
