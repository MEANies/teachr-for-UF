'use strict';

/**
 * Module dependencies
 */
var coursecrudsPolicy = require('../policies/coursecruds.server.policy'),
  coursecruds = require('../controllers/coursecruds.server.controller');

module.exports = function(app) {
  // Coursecruds Routes
  app.route('/api/coursecruds').all(coursecrudsPolicy.isAllowed)
    .get(coursecruds.list)
    .post(coursecruds.create);

  app.route('/api/coursecruds/:coursecrudId').all(coursecrudsPolicy.isAllowed)
    .get(coursecruds.read)
    .put(coursecruds.update)
    .delete(coursecruds.delete);

  // Finish by binding the Coursecrud middleware
  app.param('coursecrudId', coursecruds.coursecrudByID);
};
