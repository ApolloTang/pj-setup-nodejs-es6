import express from 'express';

import middleware from './middleware';
import api from './api';
import error from './middleware/error.js';

const app = express();

middleware(app);

app.use('/api', api);

app.use(
  function(a, b, c, d){
    console.log('error has called')
    error('xxxxxxxxxxxxxxxx')(a,b,c,d);
  }
);

export default app;
