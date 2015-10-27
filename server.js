// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');             // log requests to the console (express4)
 
var database = require('./config/database');
mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

// Create our Express application
var app = express();

// Create our Express router
var router = express.Router();

app.use(express.static(__dirname + './public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use('/node_modules',  express.static(__dirname + '/node_modules')); // Use NodeModules
app.use(morgan('dev')); // log every request to the console
 

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({extended: true}));                    // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    //app.use(methodOverride());
    
require('./app/routes.js')(app,router);

// Start the server
var port=8080;
app.listen(port);
console.log('Running on port: ' + port);