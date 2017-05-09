import _ from 'lodash';
import logger from './logger';
import User from '../api/users/user-model';


var users = [
  {name: 'Jimmy Lo'},
  {name: 'Xoko Lu'},
  {name: 'Katamon Blue'}
];

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

const cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

var createUsers = function(data) {
  var promises = users.map(function(user) {
    return createDoc(User, user);
  });
  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};


export default function seedDatabase() {
  logger.log('Seeding the Database');

  cleanDB()
    .then(createUsers)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger));
};


