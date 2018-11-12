'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Coursecrud = mongoose.model('Coursecrud'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Coursecrud
 */
exports.create = function(req, res) {
  var coursecrud = new Coursecrud(req.body);
  coursecrud.user = req.user;

  coursecrud.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(coursecrud);
    }
  });
};

/**
 * Show the current Coursecrud
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var coursecrud = req.coursecrud ? req.coursecrud.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  coursecrud.isCurrentUserOwner = req.user && coursecrud.user && coursecrud.user._id.toString() === req.user._id.toString();

  res.jsonp(coursecrud);
};

/**
 * Update a Coursecrud
 */
exports.update = function(req, res) {
  var coursecrud = req.coursecrud;

  coursecrud = _.extend(coursecrud, req.body);

  coursecrud.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(coursecrud);
    }
  });
};

/**
 * Delete an Coursecrud
 */
exports.delete = function(req, res) {
  var coursecrud = req.coursecrud;

  coursecrud.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(coursecrud);
    }
  });
};

/**
 * List of Coursecruds
 */
exports.list = function(req, res) {
  Coursecrud.find().sort('-created').populate('user', 'displayName').exec(function(err, coursecruds) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(coursecruds);
    }
  });
};

/**
 * Coursecrud middleware
 */
exports.coursecrudByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Coursecrud is invalid'
    });
  }

  Coursecrud.findById(id).populate('user', 'displayName').exec(function (err, coursecrud) {
    if (err) {
      return next(err);
    } else if (!coursecrud) {
      return res.status(404).send({
        message: 'No Coursecrud with that identifier has been found'
      });
    }
    req.coursecrud = coursecrud;
    next();
  });
};
