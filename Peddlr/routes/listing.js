const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers.js');

// Show listings of current logged-in user
router.get('/me', function(req, res){
    if (req.cookies.sessionId) {
        controller.showListingsByUser(req, res);
    } else {
        res.redirect('/login');
    }
});

// Show all listings within a category
router.get('/category/:category', function(req, res){
    if (req.cookies.sessionId) {
        controller.showListingsByCategory(req, res);
    } else {
        controller.showLogin(req, res);
    }
});

// Show listing by id
router.get('/view/:id', controller.showListingByID);

// Show the create listing page
router.get('/new', function(req, res){
    if (req.cookies.sessionId) {
        controller.showCreateListing(req, res);
    } else {
        res.redirect('/login');
    }
});

router.get('/', function(req, res){
    res.redirect('/');
});

// Create a new listing
router.post('/new', controller.createListing);

//delete a listing
router.post('/delete', controller.deleteListing);

// Update the details of a listing
router.post('/update', controller.updateListing);

module.exports = router;