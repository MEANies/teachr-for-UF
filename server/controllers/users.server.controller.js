
/* Dependencies */
var mongoose = require('mongoose'), 
    User = require('../models/users.server.model.js'),
    config = require('../config/config.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

mongoose.connect(config.db.uri);


/* Update a user */
exports.update = function(req, res) {
  var user = req.user;
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */

  User.findOneAndUpdate({email:user.email}, req.body, {new:true})
    .then(user => {
      if(!user) {
        return res.sendStatus(404);
      }
      res.json(user);
    })
    .catch(err=> {
      console.log(err);
      res.status(400).send(err.errors);
    });
};

/* Delete a listing */
// exports.delete = function(req, res) {
//   var user = req.user;
//   /** TODO **/
//   /* Remove the article */
//   User.findOneAndRemove({email: user.email})
//     .then(user => {
//       res.json(user);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(400)
//     });
// };

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
// exports.listingByID = function(req, res, next, id) {
//   Listing.findById(id).exec(function(err, listing) {
//     if(err) {
//       res.status(400).send(err);
//     } else {
//       req.listing = listing;
//       next();
//     }
//   });
// };