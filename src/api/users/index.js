import express from 'express';
import logger from '../../util/logger';

const router = express.Router();

router.route('/')
  .get(function(req, res){
    logger.log({a:'users/index.js'});
    res.send('users/index.js');
  });

export default router;
