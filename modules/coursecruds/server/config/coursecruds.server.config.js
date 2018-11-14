'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Coursecruds module init function.
 */
module.exports = function (app, db) {
	// app.init();

	db = config.db.uri;
	// console.log(db);
	// console.log(app);
	// app.start();
};
