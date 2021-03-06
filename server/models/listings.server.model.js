/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  code: {
    type: String, 
    required: true,
  }, 
  name: {
    type: String, 
    required: true, 
  }, 
  department: {
    type: String,
  }, 
  instructor_names: {
    type: [String],
  },
  description: {
    type: String,
  },
  building: {
    type: String,
  },
  building_code: {
    type: String,
  },
  office_hours: [{
    office_meetDays: {type: [String]},
    office_meetTimeBegin:{type: String},
    office_meetTimeEnd:{type: String},
    office_meetPeriodBegin:{type: Number},
    office_meetPeriodEnd:{type: Number},
    office_instructor:{type: String},
    office_locationCommonName:{type: String},
  }],
  // created_at: Date,
  // updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
// listingSchema.pre('save', function(next) {
//   var currentTime = new Date;
//   this.updated_at = currentTime;
//   if(!this.created_at)
//   {
//     this.created_at = currentTime;
//   }
//   next();
// });

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
