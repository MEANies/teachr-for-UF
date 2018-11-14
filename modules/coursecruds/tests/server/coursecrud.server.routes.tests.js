'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Coursecrud = mongoose.model('Coursecrud'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  coursecrud;

/**
 * Coursecrud routes tests
 */
describe('Coursecrud CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Coursecrud
    user.save(function () {
      coursecrud = {
        name: 'Coursecrud name'
      };

      done();
    });
  });

  it('should be able to save a Coursecrud if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Coursecrud
        agent.post('/api/coursecruds')
          .send(coursecrud)
          .expect(200)
          .end(function (coursecrudSaveErr, coursecrudSaveRes) {
            // Handle Coursecrud save error
            if (coursecrudSaveErr) {
              return done(coursecrudSaveErr);
            }

            // Get a list of Coursecruds
            agent.get('/api/coursecruds')
              .end(function (coursecrudsGetErr, coursecrudsGetRes) {
                // Handle Coursecruds save error
                if (coursecrudsGetErr) {
                  return done(coursecrudsGetErr);
                }

                // Get Coursecruds list
                var coursecruds = coursecrudsGetRes.body;

                // Set assertions
                (coursecruds[0].user._id).should.equal(userId);
                (coursecruds[0].name).should.match('Coursecrud name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Coursecrud if not logged in', function (done) {
    agent.post('/api/coursecruds')
      .send(coursecrud)
      .expect(403)
      .end(function (coursecrudSaveErr, coursecrudSaveRes) {
        // Call the assertion callback
        done(coursecrudSaveErr);
      });
  });

  it('should not be able to save an Coursecrud if no name is provided', function (done) {
    // Invalidate name field
    coursecrud.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Coursecrud
        agent.post('/api/coursecruds')
          .send(coursecrud)
          .expect(400)
          .end(function (coursecrudSaveErr, coursecrudSaveRes) {
            // Set message assertion
            (coursecrudSaveRes.body.message).should.match('Please fill Coursecrud name');

            // Handle Coursecrud save error
            done(coursecrudSaveErr);
          });
      });
  });

  it('should be able to update an Coursecrud if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Coursecrud
        agent.post('/api/coursecruds')
          .send(coursecrud)
          .expect(200)
          .end(function (coursecrudSaveErr, coursecrudSaveRes) {
            // Handle Coursecrud save error
            if (coursecrudSaveErr) {
              return done(coursecrudSaveErr);
            }

            // Update Coursecrud name
            coursecrud.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Coursecrud
            agent.put('/api/coursecruds/' + coursecrudSaveRes.body._id)
              .send(coursecrud)
              .expect(200)
              .end(function (coursecrudUpdateErr, coursecrudUpdateRes) {
                // Handle Coursecrud update error
                if (coursecrudUpdateErr) {
                  return done(coursecrudUpdateErr);
                }

                // Set assertions
                (coursecrudUpdateRes.body._id).should.equal(coursecrudSaveRes.body._id);
                (coursecrudUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Coursecruds if not signed in', function (done) {
    // Create new Coursecrud model instance
    var coursecrudObj = new Coursecrud(coursecrud);

    // Save the coursecrud
    coursecrudObj.save(function () {
      // Request Coursecruds
      request(app).get('/api/coursecruds')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Coursecrud if not signed in', function (done) {
    // Create new Coursecrud model instance
    var coursecrudObj = new Coursecrud(coursecrud);

    // Save the Coursecrud
    coursecrudObj.save(function () {
      request(app).get('/api/coursecruds/' + coursecrudObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', coursecrud.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Coursecrud with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/coursecruds/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Coursecrud is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Coursecrud which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Coursecrud
    request(app).get('/api/coursecruds/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Coursecrud with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Coursecrud if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Coursecrud
        agent.post('/api/coursecruds')
          .send(coursecrud)
          .expect(200)
          .end(function (coursecrudSaveErr, coursecrudSaveRes) {
            // Handle Coursecrud save error
            if (coursecrudSaveErr) {
              return done(coursecrudSaveErr);
            }

            // Delete an existing Coursecrud
            agent.delete('/api/coursecruds/' + coursecrudSaveRes.body._id)
              .send(coursecrud)
              .expect(200)
              .end(function (coursecrudDeleteErr, coursecrudDeleteRes) {
                // Handle coursecrud error error
                if (coursecrudDeleteErr) {
                  return done(coursecrudDeleteErr);
                }

                // Set assertions
                (coursecrudDeleteRes.body._id).should.equal(coursecrudSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Coursecrud if not signed in', function (done) {
    // Set Coursecrud user
    coursecrud.user = user;

    // Create new Coursecrud model instance
    var coursecrudObj = new Coursecrud(coursecrud);

    // Save the Coursecrud
    coursecrudObj.save(function () {
      // Try deleting Coursecrud
      request(app).delete('/api/coursecruds/' + coursecrudObj._id)
        .expect(403)
        .end(function (coursecrudDeleteErr, coursecrudDeleteRes) {
          // Set message assertion
          (coursecrudDeleteRes.body.message).should.match('User is not authorized');

          // Handle Coursecrud error error
          done(coursecrudDeleteErr);
        });

    });
  });

  it('should be able to get a single Coursecrud that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Coursecrud
          agent.post('/api/coursecruds')
            .send(coursecrud)
            .expect(200)
            .end(function (coursecrudSaveErr, coursecrudSaveRes) {
              // Handle Coursecrud save error
              if (coursecrudSaveErr) {
                return done(coursecrudSaveErr);
              }

              // Set assertions on new Coursecrud
              (coursecrudSaveRes.body.name).should.equal(coursecrud.name);
              should.exist(coursecrudSaveRes.body.user);
              should.equal(coursecrudSaveRes.body.user._id, orphanId);

              // force the Coursecrud to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Coursecrud
                    agent.get('/api/coursecruds/' + coursecrudSaveRes.body._id)
                      .expect(200)
                      .end(function (coursecrudInfoErr, coursecrudInfoRes) {
                        // Handle Coursecrud error
                        if (coursecrudInfoErr) {
                          return done(coursecrudInfoErr);
                        }

                        // Set assertions
                        (coursecrudInfoRes.body._id).should.equal(coursecrudSaveRes.body._id);
                        (coursecrudInfoRes.body.name).should.equal(coursecrud.name);
                        should.equal(coursecrudInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Coursecrud.remove().exec(done);
    });
  });
});
