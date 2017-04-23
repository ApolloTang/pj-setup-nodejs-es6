import express from 'express';

import middleware from './middleware';
import api from './api';
import error from './middleware/error.js';

const app = express();

middleware(app);

app.use('/api', api);

app.use(error());

export default app;
