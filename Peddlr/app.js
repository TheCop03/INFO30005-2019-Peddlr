//Set up express and critical middleware
var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(bodyParser.json({
    limit: '50mb',
     extended: true
}));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
     limit: '50mb',
      extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
require('./models/db.js');

// Routes setup
var routes = require('./routes/routes.js');
app.use('/',routes);

// Start the server
app.listen(PORT, () => {
   console.log(`Listening on port ${ PORT }. Alter environment variable PORT to change this.`);
});
