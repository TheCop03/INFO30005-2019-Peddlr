var express = require('express');
var router = express.Router();

var controller = require('../controllers/userControllers.js');

// Create new user
router.post('/peddlr',controller.createUser);

// Find one user by id
router.get('/peddlr/id/:id',controller.findOneUser);

//Find one user by name
router.get('/peddlr/fname/:fname/lname/:lname',controller.findUserByName);


module.exports = router;