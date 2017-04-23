import User from './user-model';
import _ from 'lodash';

const params = (req, res, next, id) => {
  User.findById(id)
    .then(
      user=>{
        if (!user) {
          next(new Error(`No user with id: ${id}`));
        } else {
          req.user = user;
          next();
        }
      },
      err=>{ next(err); }
    );
};

const post = (req, res, next) => {
  const newUser = req.body;
  console.log('in post: ', newUser);
  User.create(newUser)
    .then(
      userJustCreated=>{
        res.json(userJustCreated);
      },
      err=>{
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
        next(err);
      }
    );
};

const getOne = (req, res, next) => {
  var user = req.user;
  res.json(user);
};

const put = (req, res, next) => {
  var user = req.user;
  var update = req.body;
  _.merge(user, update);
  user.save( (err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

const del = (req, res, next) => {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};


export default {params, post, get, getOne, put, del};
