import mongoose from 'mongoose';
import User from './user-model';
import _ from 'lodash';

const params = (req, res, next, _id) => {
  let id = _id
  // id = mongoose.Types.ObjectId(_id);
  User.findById(id).exec()
    .then(
      user=>{
        if (!user) {
          next(new Error(`No user with id: ${id}`));
        } else {
          req.user = user;
          next();
        }
      },
      err=>{
        res.status(404).send(`${err.message}. Meaning: No user with id: ${id}`);
        // next(err);
      }
    );
};

const post = (req, res, next) => {
  const newUser = req.body;
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
