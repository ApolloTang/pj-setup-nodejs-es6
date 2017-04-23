import User from './user-model';
import _ from 'lodash';

const post = (req, res, next) => {
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
};

const get = (req, res, next) => {
  User.find({})
    .then(
      foundUser => {
        res.json(foundUser);
      },
      err=>{
        console.log('in get: err: ',err)
        next(err);
      }
    );
};

export default {post, get};
