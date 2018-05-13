const http    = require('http');
const app     = require('./config/express')();
              require('./config/database.js')();
const Starter = require('./starter');


const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('Express is running on port ' + app.get('port'));

    const starter = new Starter();
    starter.configureApplication();
});

module.exports = server;
