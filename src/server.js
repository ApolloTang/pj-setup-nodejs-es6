import express from 'express';

import middleware from './middleware';
import api from './api';

const app = express();

middleware(app);

app.use('/api', api);

export default app;
