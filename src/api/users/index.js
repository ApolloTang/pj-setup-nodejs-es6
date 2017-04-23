import _ from 'lodash';

import express from 'express';
import logger from '../../util/logger';
import User from './user-model';

const router = express.Router();

// const users = [];
// let id = 0;

// router.param('id', (req, res, next, id)=>{
//   // const userIndex = _.findIndex(users, {id});
//   // if (userIndex) {
//   //   req.userIndex = userIndex;
//   //   next();
//   // } else {
//   //   res.send();
//   // }
//   User.findById(id)
//     .then(
//       user=>{
//         if (!user) {
//           next(new Error(`No user with id: ${id}`));
//         } else {
//           next();
//         }
//       },
//       err=>{ next(err); }
//     );
// });

router.route('/')
  .get( (req, res, next) => {
    res.json(users);
  })
  .post( (req, res, next) => {
    const newUser = req.body;
    console.log('in post: ', newUser);
    User.create(newUser)
      .then(
        userJustCreated=>{
          console.log('in post: userJustCreated: ', userJustCreated);
          res.json(userJustCreated);
        },
        err=>{
          console.log('in post: err: ',err)
          next(err);
        }
      )
  });

// router.route('/:id')
//   .delete( (req, res) => {
//     const userIndex = req.userIndex;
//     const deletedUser = users.splice(userIndex, 1);
//     res.json(deletedUser[0]);
//   })
//   .get( (req, res) => {
//     const userIndex = req.userIndex;
//     const foundedUser = users[userIndex];
//     res.json(deletedUser[0]);
//   })
//   .put( (req, res) => {
//     const userToUpdate = req.body;
//     if (userToUpdate.id) {
//       delete userToUpdate.id;
//     }
//     const userIndex = req.userIndex;
//     if (!users[userIndex]) {
//       res.send();
//     } else {
//       const updatedUser = _.assign(users[userIndex], userToUpdate);
//       res.json(updatedUser);
//     }
//   });

export default router;

function updateId(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id+'';
  }
  next();
};

