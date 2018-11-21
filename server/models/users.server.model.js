/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validateUFLEmail = function(email) {
	if(/@ufl.edu\s*$/.test(email)) {
    return true;
  } else {
    return false;
  }
};

var validateUsername = function (username) {
  var usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
  return (
    (username && usernameRegex.test(username))
  );
};
/* Create your schema */
var usersSchema = new Schema({
  username: {
    type: String, 
    required: true,
		unique: 'This username already exists!'
  }, 
  email: {
    type: String, 
    required: true, 
		unique: true,
		validate: [validateUFLEmail, 'Please use your ufl email to signup!']
  }, 
  password: {
    type: String, 
    required: true
  },
  role: {
		type: [{
			type: String,
			enum: ['user', 'instructor']
		}],
		required: 'Please choose your role!'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
usersSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});



var User = mongoose.model('User', usersSchema, 'users');

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;