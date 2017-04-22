import _ from 'lodash';
import express from 'express';
import logger from '../../util/logger';

const router = express.Router();

const users = [];
let id = 0;

router.route('/')
  .get( (req, res) => { res.json(users); })
  .post( updateId, (req, res) => {
    const user = req.body;
    users.push(user);
    res.json(user);
  });

router.route('/:id')
  .delete( (req, res) => {
    const userIndex = _.findIndex(users, {id: req.params.id});
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  })
  .get( (req, res) => {
    const userIndex = _.findIndex(users, {id: req.params.id});
    const foundedUser = users[userIndex];
    res.json(deletedUser[0]);
  })
  .put( (req, res) => {
    const userToUpdate = req.body;
    if (userToUpdate.id) {
      delete userToUpdate.id;
    }
    const userIndex = _.findIndex(users, {id: req.params.id});
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

