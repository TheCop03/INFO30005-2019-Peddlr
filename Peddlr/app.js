//Set up express
var express = require('express');
var app = express();

app.set('view engine', 'pug');

var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
require('./models/db.js');

// Routes setup
var routes = require('./routes/routes.js');
app.use('/',routes);

// Start the server
app.listen(PORT, () => {
   console.log(process.env.PORT);
   console.log(`Listening on ${ PORT }`);
});

