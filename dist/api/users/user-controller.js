'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('./user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = function params(req, res, next, _id) {
  var id = _id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    // Ref: http://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
    _userModel2.default.findById(id).exec().then(function (user) {
      if (!user) {
        res.status(404).send('No user with id: ' + id);
      } else {
        req.user = user;
        next();
      }
    }, function (err) {
      next(err);
    });
  } else {
    res.status(404).send('Invalid user id: ' + id);
  }
};

var post = function post(req, res, next) {
  var newUser = req.body;
  _userModel2.default.create(newUser).then(function (userJustCreated) {
    res.status(201).json(userJustCreated);
  }, function (err) {
    next(err);
  });
};

var get = function get(req, res, next) {
  _userModel2.default.find({}).then(function (foundUser) {
    res.json(foundUser);
  }, function (err) {
    next(err);
  });
};

var getOne = function getOne(req, res, next) {
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

var put = function put(req, res, next) {
  var user = req.user;
  var update = req.body;
  _lodash2.default.merge(user, update);
  user.save(function (err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

var del = function del(req, res, next) {
  req.user.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

exports.default = { params: params, post: post, get: get, getOne: getOne, put: put, del: del };