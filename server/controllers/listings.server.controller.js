
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    config = require('../config/config.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

mongoose.connect(config.db.uri);


/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);


  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */

  Listing.findOneAndUpdate({code:listing.code}, req.body, {new:true})
    .then(listing => {
      if(!listing) {
        return res.sendStatus(404);
      }
      res.json(listing);
    })
    .catch(err=> {
      console.log(err);
      res.status(400).send(err.errors);
    });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;
  /** TODO **/
  /* Remove the article */
  Listing.findOneAndRemove({code: listing.code})
    .then(listing => {
      res.json(listing);
    })
    .catch(err => {
      console.log(err);
      res.status(400)
    });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
  Listing.find({})
    .then(listings => {
      listings = listings.sort(function(a,b){
        return a.code - b.code;
      });
      res.json(listings);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
  }
/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};