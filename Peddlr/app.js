//Set up express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
require('./models/db.js');

// Routes setup
var routes = require('./routes/routes.js');
app.use('/',routes);

// Start the server
app.listen(process.env.port || 3000,function(req,res){
   console.log('Service listening');
});

