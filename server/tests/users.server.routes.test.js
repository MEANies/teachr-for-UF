var should = require('should'), 
    request = require('supertest'), 
    express = require('../config/express'), 
    User = require('../models/users.server.model.js');

/* Global variables */
var app, agent, user, id;

/* Unit tests for testing server side routes for the listings API */
describe('User CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });

  // it('should it able to retrieve all listings', function(done) {
  //   agent.get('/api/listings')
  //     .expect(200)
  //     .end(function(err, res) {
  //       should.not.exist(err);
  //       should.exist(res);
  //       // res.body.should.have.length(6711);
  //       done();
  //     });
  // });
  // it('should be able to retrieve a single listing', function(done) {
  //   Listing.findOne({code: 'MDT7710'}, function(err, listing) {
  //     if(err) {
  //       console.log(err);
  //     } else {
  //       agent.get('/api/listings/' + listing._id)
  //         .expect(200)
  //         .end(function(err, res) {
  //           should.not.exist(err);
  //           should.exist(res);
  //           res.body.name.should.equal('Elec Topic Emerg Med');
  //           res.body.code.should.equal('MDT7710');
  //           res.body.department.should.equal('Medicine-Emergency Medicine,Medicine-Emergency Medicine');
  //           res.body.instructor_names[0].should.equal(
  // 'Leslie Nickels,Carolyn Holland,Matthew Ryan,Marie Elie,Elizabeth Devos,Harvey Rohlwing,Leslie Nickels,Elizabeth Devos,Harvey Rohlwing,Carolyn Holland,Matthew Ryan,Marie Elie'
  // );
  //           res.body.description[0].should.equal('Elec Topic Emerg Med');
  //           res.body._id.should.equal(listing._id.toString());
  //           done();
  //         });
  //     }
  //   });
  // });

  // it('should be able to save a listing', function(done) {
  //   var listing = {
  //     code: 'CEN3031', 
  //     name: 'Introduction to Software Engineering', 
  //     department: 'Computer and Information Sciences',
  //     instructor_names: ['Dr. Philippa Brown']
  //   };
  //   agent.post('/api/listings')
  //     .send(listing)
  //     .expect(200)
  //     .end(function(err, res) {
  //       should.not.exist(err);
  //       should.exist(res.body._id);
  //       res.body.name.should.equal('Introduction to Software Engineering');
  //       res.body.code.should.equal('CEN3031');
  //       res.body.department.should.equal('Computer and Information Sciences');
  //       res.body.instructor_names[0].should.equal('Dr. Philippa Brown');
  //       id = res.body._id;
  //       done();
  //     });
  // });

  // it('should be able to update a listing', function(done) {
  //   var updatedListing = {
  //     code: 'CEN3031', 
  //     name: 'Introduction to Software Engineering', 
  //     department: 'Computer and Information Sciences',
  //     instructor_names: 'Dr. Philippa Brown,Pedro G. Feijoo-Garcia',
  //   };

  //   agent.put('/api/listings/' + id)
  //     .send(updatedListing)
  //     .expect(200)
  //     .end(function(err, res) {
  //       should.not.exist(err);
  //       should.exist(res.body._id);
  //       res.body.name.should.equal('Introduction to Software Engineering');
  //       res.body.code.should.equal('CEN3031');
  //       res.body.department.should.equal('Computer and Information Sciences');
  //       res.body.instructor_names[0].should.equal('Dr. Philippa Brown,Pedro G. Feijoo-Garcia');
  //       done();
  //     });
  // });

  it('should be able to update saved courses', function(done) {
    var updatedUser = {
      username: "dtravieso2",
      password: "vZl4XrE/nvjJw2SKu3pYSPdy0dkfxxwDfJ/lsf5QOnlsZPQZquTF2zwgd0U+7MmBvA1AZ2NYSQYeluf+pAg5jw==",
      email: "dtravieso2@ufl.edu",
      lastName: "Travieso",
      firstName: "Daniela",
      saved_courses: ["COP3503", "CEN3031", "STA3032"],
    };
    User.findOne({email: 'dtravieso2@ufl.edu'}, function(err, user) {
        if(err) {
          console.log(err);
        } 
        else {
          agent.put('/api/auth/save_course' + user._id)
          .send(updatedUser)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res.body._id);
            res.body.saved_courses[0].should.equal("COP3503");
            res.body.saved_courses[1].should.equal("CEN3031");
            res.body.saved_courses[2].should.equal("STA3032");

            done();
          });
        }
    });
  });
});
  // it('should be able to delete a listing', function(done) {
  //   // console.log(id);
  //   agent.delete('/api/listings/' + id)
  //     .expect(200)
  //     .end(function(err, res) {
  //       should.not.exist(err);
  //       should.exist(res);

  //       agent.get('/api/listings/' + id) 
  //         .expect(400)
  //         .end(function(err, res) {
  //           id = undefined;
  //           done();
  //         });
  //     })
  // });

  after(function(done) {
    if(id) {
      Listing.remove({_id: id}, function(err){
        if(err) throw err;
        done();
      });
    }
    else {
        done();
    }
  });

