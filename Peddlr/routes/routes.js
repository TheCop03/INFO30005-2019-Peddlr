var express = require('express');
var router = express.Router();

var controller = require('../controllers/controllers.js'); //create controllers.js

router.get("/", function(req, res, next){
  res.render('index.pug', {title: 'Peddlr'});
});

//show the homepage with all listings and categories
router.get("/homepage", controller.showHomepage);

router.get("/logout", function(req, res, next){
  res.cookie('sessionId', '');
  res.redirect("/homepage") // You've been logged out
});

// Show listings of current logged-in user
router.get('/mylistings', controller.showListingsByUser);

//show all listings within a category
router.get('/listing/category/:category', function(req, res){
    if (req.cookies.sessionId) {
      controller.showListingsByCategory(req, res);
    } else {
      controller.showLogin(req, res);
    }
});

//show listing by id
router.get('/listing/id/:id', function(req, res){
    if (req.cookies.sessionId) {
      controller.showListingByID(req, res);
    } else {
      controller.showLogin(req, res);
    }
});

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

//show the settings page
router.get('/settings/general', function(req, res){
    if (req.cookies.sessionId) {
        controller.showSettings(req, res);
    } else {
        res.redirect('/login');
    }
});

//update general settings
router.post('/settings/general/update', function(req, res){
    if (req.cookies.sessionId) {
        controller.editUser(req, res);
    } else {
        res.redirect('/login');
    }
});

//update security settings
router.post('/settings/security/update', function(req, res){
    if (req.cookies.sessionId) {
        controller.editPassword(req, res);
    } else {
        res.redirect('/login');
    }
});

//show the security settings page
router.get('/settings/security', function(req, res){
    if (req.cookies.sessionId) {
        controller.showPrivacy(req, res);
    } else {
        res.redirect('/login');
    }
});

//redirect settings to general settings
router.get('/settings', function(req, res){
    if (req.cookies.sessionId) {
        res.redirect('/settings/general');
    } else {
        res.redirect('/login');
    }
});

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
router.post('/deleteListing', controller.deleteListing);

// Update the details of a listing
router.post('/updateListing', controller.updateListing);

//login a user
router.post('/login', controller.loginUser);

//create a new user
router.post('/newUser', controller.createUser);

//autocomplete search for search bar
router.get('/searchlistings/:input', controller.searchListing);

//autocomplete search for search bar within a category
router.get('/searchlistingbycategory/:input/:title', controller.searchListingByCategory);

//autocomplete search for search bar within My Listings
router.get('/searchlistingbyuser/:input/:user', controller.searchListingByUser);

//searching for listings, all search results
router.get('/searchresults/:category/:user', controller.searchResults);


module.exports = router;
