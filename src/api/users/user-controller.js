import mongoose from 'mongoose';
import User from './user-model';
import _ from 'lodash';

const params = (req, res, next, _id) => {
  let id = _id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    // Ref: http://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
    User.findById(id).exec()
      .then(
        user=>{
          if (!user) {
            res.status(404).send(`No user with id: ${id}`);
          } else {
            req.user = user;
            next();
          }
        },
        err=>{
          next(err);
        }
      );
  } else {
      res.status(404).send(`Invalid user id: ${id}`);
  }
};

const post = (req, res, next) => {
  const newUser = req.body;
  User.create(newUser)
    .then(
      userJustCreated=>{
        res.status(201).json(userJustCreated);
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
  // -- The following is handle in param middleware -- //
  //
  // var user = req.user;
  // var id = user._id;
  // User.find({'_id':id})
  //   .then(
  //     foundUser => {
  //       res.json(foundUser[0]);
  //     },
  //     err=>{
  //       console.log('errorrrr: ', id)
  //       res.status(404).send(`${err.message}`);
  //     }
  //   );
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
