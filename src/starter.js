const UserBO                = require('./business/userBO');
const DAOFactory            = require('./daos/daoFactory');
const ModelParser           = require('./models/modelParser');
const JWTHelper             = require('./helpers/jwtHelper');
const UserHelper            = require('./helpers/userHelper');
const md5                   = require('./helpers/md5');
module.exports = class Starter {

  constructor () {
    this.modelParser = new ModelParser();
    this.userBO = new UserBO({
      userDAO: DAOFactory.getDAO('user'),
      modelParser: this.modelParser,
      jwtHelper: new JWTHelper(),
      userHelper: new UserHelper()
    });
  }

  async createAdminUser() {

      // in TEST environment there is no need to create a default admin user
      if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
        return
      } else {
        try {
          await this.userBO.createUserWithoutValidations({
            name: 'Administrator',
            email: 'admin@barthmockserver.com',
            password: '123456',
            role: 'admin',
            confirmation: {
              key: md5('')
            },
            internalKey: md5('.')
          });
        } catch(error) {
          if (error.status === 409) {
            return
          } else {
            console.log(error);
          }
        };
      }

  }

  configureApplication() {
     this.createAdminUser();
  }

};