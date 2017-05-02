import express from 'express';
const router = express.Router();

import users from './users';
import userCatlog from './user-catelog';

router.use('/users', users);
router.use('/userCatelog', userCatlog);

export default router;
