var express = require('express');
var router = express.Router();

var controller = require('../controllers/listingControllers.js');

router.post('/api',controller.createListing);

router.get('/api',controller.showAllListings);

//search for a listing
router.get('/api/title/:title', controller.findListingByName);

module.exports = router;