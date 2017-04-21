import express from 'express';
const router = express.Router();

import users from './users';
router.use('/users', users);

module.exports = router;
