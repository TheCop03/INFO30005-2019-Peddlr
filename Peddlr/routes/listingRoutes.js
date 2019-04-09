var express = require('express');
var router = express.Router();

var controller = require('../controllers/listingControllers.js');

//create a new listing
router.post('/newListing',controller.createListing);

//show all listings with latest listing first
router.get('/listings',controller.showAllListings); 

//search for a listing
router.get('/listings/title/:title', controller.findListingByName);

//show all listings from a certain category
router.get('listings/category/:category', controller.showListingsByCategory);

module.exports = router;