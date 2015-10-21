// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ContactSchema   = new mongoose.Schema({
  name: String,
  lastName: String,
  birthday: Date,
  email: String,
  location: {type: [Number], required: true}, // [Long, Lat]
  htmlverified: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
ContactSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
ContactSchema.index({location: '2dsphere'});

// Export the Mongoose model
module.exports = mongoose.model('Contact', ContactSchema);

