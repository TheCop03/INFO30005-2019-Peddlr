var express = require('express');
var router = express.Router();

var controller = require('../controllers/listingControllers.js');

//create a new listing
router.post('/peddlr',controller.createListing);

//show all listings with latest listing first
router.get('/peddlr',controller.showAllListings);

//search for a listing
router.get('/peddlr/title/:title', controller.findListingByName);

//show all listings from a certain category
router.get('peddlr/category/:category', controller.showListingsByCategory);

module.exports = router;