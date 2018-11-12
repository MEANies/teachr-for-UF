'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Coursecruds Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/coursecruds',
      permissions: '*'
    }, {
      resources: '/api/coursecruds/:coursecrudId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/coursecruds',
      permissions: ['get', 'post']
    }, {
      resources: '/api/coursecruds/:coursecrudId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/coursecruds',
      permissions: ['get']
    }, {
      resources: '/api/coursecruds/:coursecrudId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Coursecruds Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Coursecrud is being processed and the current user created it then allow any manipulation
  if (req.coursecrud && req.user && req.coursecrud.user && req.coursecrud.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
