/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
		bcrypt = require('bcrypt'),
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
		type: String,
		required: 'Please choose your role!'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  tempToken: {
    type: String,
    required: true
  },
  research: {
    hour: {
      type: Number,
      default: 0
    },
    detail: {
      type: String,
      default: ''
    }
  },
  social: {
    twitter: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    }
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

usersSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', usersSchema, 'users');

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;