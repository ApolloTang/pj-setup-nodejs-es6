import _ from 'lodash';
import express from 'express';
import logger from '../../util/logger';

const router = express.Router();

const users = [];
let id = 0;

router.param('id', (req, res, next, id)=>{
  const userIndex = _.findIndex(users, {id});
  if (userIndex) {
    req.userIndex = userIndex;
    next();
  } else {
    res.send();
  }
});


router.route('/')
  .get( (req, res, next) => {
    ///////////////////
    // return next(new Error('testing throwing error') );
    // next('testing throwing error');
    return next(new Error('testing throwing error'));
    ///////////////////
    // res.json(users);
  })
  .post( updateId, (req, res) => {
    const user = req.body;
    users.push(user);
    res.json(user);
  });

router.route('/:id')
  .delete( (req, res) => {
    const userIndex = req.userIndex;
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  })
  .get( (req, res) => {
    const userIndex = req.userIndex;
    const foundedUser = users[userIndex];
    res.json(deletedUser[0]);
  })
  .put( (req, res) => {
    const userToUpdate = req.body;
    if (userToUpdate.id) {
      delete userToUpdate.id;
    }
    const userIndex = req.userIndex;
    if (!users[userIndex]) {
      res.send();
    } else {
      const updatedUser = _.assign(users[userIndex], userToUpdate);
      res.json(updatedUser);
    }
  });

export default router;

function updateId(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id+'';
  }
  next();
};

