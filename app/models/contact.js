// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ContactSchema   = new mongoose.Schema({
  name: String,
  lastName: String,
  birthday: Date,
  email: String
});

// Export the Mongoose model
module.exports = mongoose.model('Contact', ContactSchema);

