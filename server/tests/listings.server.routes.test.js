var should = require('should'), 
    request = require('supertest'), 
    express = require('../config/express'), 
    Listing = require('../models/listings.server.model.js');

/* Global variables */
var app, agent, listing, id;

/* Unit tests for testing server side routes for the listings API */
describe('Listings CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });

  it('should it able to retrieve all listings', function(done) {
    agent.get('/api/listings')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        // res.body.should.have.length(6711);
        done();
      });
  });
  it('should be able to retrieve a single listing', function(done) {
    Listing.findOne({code: 'MDT7710'}, function(err, listing) {
      if(err) {
        console.log(err);
      } else {
        agent.get('/api/listings/' + listing._id)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.name.should.equal('Elec Topic Emerg Med');
            res.body.code.should.equal('MDT7710');
            res.body.department.should.equal('Medicine-Emergency Medicine,Medicine-Emergency Medicine');
            res.body.instructor_names[0].should.equal(
  'Leslie Nickels,Carolyn Holland,Matthew Ryan,Marie Elie,Elizabeth Devos,Harvey Rohlwing,Leslie Nickels,Elizabeth Devos,Harvey Rohlwing,Carolyn Holland,Matthew Ryan,Marie Elie'
  );
            res.body.description[0].should.equal('Elec Topic Emerg Med');
            res.body._id.should.equal(listing._id.toString());
            done();
          });
      }
    });
  });

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

  it('should be able to update office hours', function(done) {
    var updatedListing = {
      code: "CEN3031", 
      name: "Introduction to Software Engineering", 
      department: "Computer and Information Sciences",
      instructor_names: "Philippa Brown",
      office_hours: {
        Su: [
            ""
        ],
        F: [
            ""
        ],
        R: [
            ""
        ],
        W: [
            ""
        ],
        T: [
            ""
        ],
        M: [
            "3", "5"
        ],
        S: [
            ""
        ]
      },
    };
    Listing.findOne({code: 'CEN3031'}, function(err, listing) {
        if(err) {
          console.log(err);
        } 
        else {
          agent.put('/api/listings/' + listing._id)
          .send(updatedListing)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res.body._id);
            res.body.name.should.equal('Introduction to Software Engineering');
            res.body.code.should.equal('CEN3031');
            res.body.department.should.equal('Computer and Information Sciences');
            res.body.instructor_names[0].should.equal('Philippa Brown');
            res.body.office_hours.M[0].should.equal('3');
            res.body.office_hours.M[1].should.equal('5')
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

