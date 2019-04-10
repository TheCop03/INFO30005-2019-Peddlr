var express = require('express');
var router = express.Router();

var controller = require('../controllers/controllers.js'); //create controllers.js

//show the homepage with all listings and categories
router.get('/homepage', controller.showHomepage);

//show a listings page by finding it by title
router.get('/listing/title/:title', controller.findListingByName);

//show a users page by finding them by name
router.get('/user/fname/:fname/lname/:lname', controller.findUserByName);

//create a new listing
router.post('/newListing', controller.createListing);

//login a user
router.post('/login', controller.loginUser);

//create a new user
router.post('/newUser', controller.createUser);

module.exports = router;