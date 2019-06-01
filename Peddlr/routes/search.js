var express = require('express');
var router = express.Router();

var controller = require('../controllers/controllers.js');

//autocomplete search for search bar
router.get('/list/:input', controller.searchListing);

//autocomplete search for search bar within a category
router.get('/categorylist/:input/:title', controller.searchListingByCategory);

//autocomplete search for search bar within My Listings
router.get('/userlist/:input/:user', controller.searchListingByUser);

//searching for listings, search results
router.get('/', controller.search);

module.exports = router;
