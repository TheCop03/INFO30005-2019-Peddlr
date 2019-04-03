//Set up express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
require('./models/db.js');

// Routes setup
var listingRoutes = require('./routes/listingRoutes.js');
var userRoutes = require('./routes/userRoutes.js');
app.use('/listing',listingRoutes);
app.use('/users', userRoutes);

// Start the server
app.listen(3000,function(req,res){
   console.log('Express listening on port 3000');
});