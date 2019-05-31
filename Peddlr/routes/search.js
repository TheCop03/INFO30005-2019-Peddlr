var express = require('express');
var router = express.Router();

var controller = require('../controllers/controllers.js');

//autocomplete search for search bar
router.get('/list/:input', controller.searchListing);

//searching for listings, search results
router.get('/', controller.search);

module.exports = router;
