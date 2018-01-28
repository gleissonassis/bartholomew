var UserBO                = require('./business/userBO');
var DAOFactory            = require('./daos/daoFactory');
var ModelParser           = require('./models/modelParser');
var JWTHelper             = require('./helpers/jwtHelper');
var UserHelper            = require('./helpers/userHelper');
var md5                   = require('./helpers/md5');
var Promise               = require('promise');

module.exports = function() {
  var modelParser = new ModelParser();

  var userBO = new UserBO({
    userDAO: DAOFactory.getDAO('user'),
    modelParser: modelParser,
    jwtHelper: new JWTHelper(),
    userHelper: new UserHelper()
  });

  return {
    createAdminUser: function() {
      return new new Promise(function(resolve, reject) {
        // in TEST environment there is no need to create a default admin user
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
          resolve();
        } else {
          userBO.createUserWithoutValidations({
            name: 'Administrator',
            email: 'admin@barthmockserver.com',
            password: '123456',
            role: 'admin',
            confirmation: {
              key: md5('')
            },
            internalKey: md5('.')
          })
          .then(resolve)
          .catch(function(error) {
            if (error.status === 409) {
              resolve();
            } else {
              reject(error);
            }
          });
        }
      });
    },

    configureApplication: function() {
      var self = this;
      var chain = Promise.resolve();

      return chain
        .then(function() {
          return self.createAdminUser();
        });
    }
  };
};
