import express from 'express';
import mongoose from 'mongoose';

import config from './config';
import middleware from './middleware';
import api from './api';
import error from './middleware/error.js';

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

middleware(app);

app.use('/api', api);

app.use(error());

export default app;
