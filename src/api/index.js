import express from 'express';
const router = express.Router();

import users from './users';
import userCatlog from './user-catelog';
import review from './review';

router.use('/users', users);
router.use('/userCatelog', userCatlog);
router.use('/reviews', review);

export default router;
