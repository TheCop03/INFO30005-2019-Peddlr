var express = require('express');
var router = express.Router();

var controller = require('../controllers/listingControllers.js');

router.post('/api',controller.createListing);

router.get('/api/id/:id',controller.showAllListings);