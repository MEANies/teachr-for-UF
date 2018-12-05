/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  code: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  department: {type: String},
  description: {type: String},
  instructor_names: {type: [String]},
  building: {type: String},
  building_code: {type: String},
  // office_hours: [
  //   {
  //     periods: {
  //       key: Number,
  //       values: [
  //         {
  //           days: {
  //               key: Number,
  //               values: Boolean
  //           }
  //         }
  //       ]
  //     }
  //   }
  // ],



  office_hours: [{
    office_meetNo: {type: Number},
  	office_meetDays: {type: [String]},
    office_meetTimeBegin:{type: String},
    office_meetTimeEnd:{type: String},
    office_meetPeriodBegin:{type: Number},
    office_meetPeriodEnd:{type: Number},
    office_instructor:{type: String},
    office_locationABBREV:{type: String},
  }],


  announcements: [{
    header: {type: String},
    body: {type: String},
  }],
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
// listingSchema.pre('save', function(next) {
//   /* your code here */
//   var currentDate = new Date();

//   this.updated_at = currentDate;

//   if(!this.created_at){
//   	this.created_at = currentDate;
//   }
  
//   next();
// });

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to mak e it avaiable to other parts of your Node application */
module.exports = Listing;
