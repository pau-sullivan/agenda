// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
 var morgan = require('morgan');             // log requests to the console (express4)

var contactController = require('./app/controllers/contact');

 
var database = require('./config/database');
mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

// Create our Express application
var app = express();

app.use(express.static(__dirname + './public'));
app.use(morgan('dev')); // log every request to the console
 

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({extended: true}));                    // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    //app.use(methodOverride());


// Use environment defined port or 3000
//var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
router.get('/', function(req, res) {
  res.json({ message: 'Home!' });
});

router.route('/contacts')
  .post(contactController.postContacts)
  .get(contactController.getContacts);
  
router.route('/contacts/:contact_id')
   .get(contactController.getContact)
   .delete(contactController.deleteContact);
  

// Register all our routes with /api
app.use('/api', router);


var path = require('path');

// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendFile(path.resolve('./public/index.html'));
    //res.sendFile(__dirname + '/public/index.html');
});

//var webRoutes=require(path.resolve(__dirname + '/public'));
app.get('*',function(req,res){
    res.sendFile(__dirname + '/public/' + req.url);
    //console.log(req.url);
});

// Start the server
var port=8080;
app.listen(port);
console.log('Running on port: ' + port);