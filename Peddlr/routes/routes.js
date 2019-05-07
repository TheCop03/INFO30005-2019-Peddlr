var express = require('express');
var router = express.Router();

var controller = require('../controllers/controllers.js'); //create controllers.js

router.get("/", function(req, res, next){
  res.render('index.pug', {title: 'Peddlr'});
});

//show the homepage with all listings and categories
router.get('/homepage', controller.showHomepage);

//show a listings page by finding it by title
router.get('/listing/title/:title', controller.findListingByName);

//show all listings within a category
router.get('/listing/category/:category', controller.showListingsByCategory);

//show listing by id
router.get('/listing/id/:id', controller.showListingByID);

//show a users page by finding them by name
router.get('/user/fname/:fname/lname/:lname', controller.findUserByName);

//show the sign up page
router.get('/signup', controller.showSignUp);

//show the login up page
router.get('/loginpage', controller.showLogin);

//create a new listing
router.post('/newListing', controller.createListing);

//delete a listing
router.post('/deleteListing', controller.deleteListing)

//login a user
router.post('/login', controller.loginUser);

//create a new user
router.post('/newUser', controller.createUser);


module.exports = router;
