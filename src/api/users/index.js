import express from 'express';
const router = express.Router();


router.route('/')
  .get(function(req, res){
      res.send('users/index.js');
  });

export default router;
