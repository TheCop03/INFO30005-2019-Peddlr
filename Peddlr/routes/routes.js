var express = require('express');
var router = express.Router();

var controller = require('../controllers/controllers.js'); //create controllers.js

router.get("/", function(req, res, next){
  res.render('index.pug', {title: 'Peddlr'});
});

//show the homepage with all listings and categories
router.get("/homepage", function(req, res, next){
  if (req.cookies.sessionId) {
    controller.showLoggedInHomepage();
  } else {
    controller.showHomepage(req, res);
  }
});

router.get("/logout", function(req, res, next){
  res.cookie('sessionId', '');
  res.redirect("/homepage") // You've been logged out
});

//show all listings within a category
router.get('/listing/category/:category', controller.showListingsByCategory);

//show listing by id
router.get('/listing/id/:id', controller.showListingByID);

//show the sign up page
router.get('/signup', function(req, res, next){
  if (req.cookies.sessionId) {
    res.redirect('/homepage');
  } else {
    controller.showSignUp(req, res);
  }
});

//show the login up page
router.get('/login', controller.showLogin);

//show the about us page
router.get('/aboutus', controller.showAboutUs);

//show the settings page
router.get('/settings', controller.showSettings);

//show the create listing page
router.get('/newListing', function(req, res, next){
  if (req.cookies.sessionId) {
    controller.showCreateListing(req, res);
  } else {
    res.redirect('/login');
  }
});

//create a new listing
router.post('/newListing', controller.createListing);

//delete a listing
router.post('/deleteListing', controller.deleteListing)

//login a user
router.post('/login', controller.loginUser);

//create a new user
router.post('/newUser', controller.createUser);


module.exports = router;
