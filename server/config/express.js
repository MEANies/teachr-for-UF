var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
    authRouter = require('../routes/auth.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri, { useMongoClient: true });

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  /**TODO
  Serve static files */
  // app.use('./static', express.static(path.join(__dirname, 'client')));
  app.use(express.static('client'))
  /**TODO 
  Use the listings router for requests to the api */
  app.use('/api/listings',listingsRouter);
  app.use('/api/auth', authRouter);

  /**TODO 
  Go to homepage for all routes not specified */ 
  app.get('*',function(req,res) {
    res.redirect('/login.html');
  });
  return app;
};  