import _ from 'lodash';

import express from 'express';
import logger from '../../util/logger';

import createRoutes from  '../../util/create-routes';
import controller from  './user-controller';

const router = express.Router();

createRoutes(controller, router);

export default router;


