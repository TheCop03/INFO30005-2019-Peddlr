//Set up express and critical middleware
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const utils = require('./controllers/utils.js');

//Abstracting routers for modularity
const indexRouter = require('./routes/index');
const listingRouter = require('./routes/listing');
const settingsRouter = require('./routes/settings');
const searchRouter = require('./routes/search');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

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

app.use(function (req, res, next) {
    if (req.cookies.sessionId) {
        utils.verify_logged_in(req.cookies.sessionId, function (loggedin) {
            console.log(loggedin);
            if (!loggedin) {
                res.cookie('sessionId', '');
                res.redirect('/');
            } else {
                next();
            }
        });
    } else {
        next();
    }
});

// Database setup
require('./models/db.js');

// Routes setup
app.use('/', indexRouter);
app.use('/listing', listingRouter);
app.use('/settings', settingsRouter);
app.use('/search', searchRouter);

// Start the server
app.listen(PORT, () => {
   console.log(`Listening on port ${ PORT }. Alter environment variable PORT to change this.`);
});
