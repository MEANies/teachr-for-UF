'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Coursecrud Schema
 */
var CoursecrudSchema = new Schema({
  code:{
    type: String,
    default: '',
    required: 'Please fill course code',
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill course name',
  },
  department: {
    type: String,
  },
  instructor_names: {
    type: [String]
  },
  description: {
    type: [String]
  },
});

mongoose.model('Coursecrud', CoursecrudSchema);
