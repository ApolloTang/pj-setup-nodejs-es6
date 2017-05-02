import _ from 'lodash';

import express from 'express';
import logger from '../../util/logger';

import createRoutes from  './create-routes';
import controller from  './user-catelog-controller';

const router = express.Router();

createRoutes(controller, router);

export default router;


