import _ from 'lodash';
import User from '../users/user-model';

const get = (req, res, next) => {
  User.find({}, 'name')
    .then(
      foundUser => {
        res.json(foundUser);
      },
      err=>{
        next(err);
      }
    );
};

export default {get};
