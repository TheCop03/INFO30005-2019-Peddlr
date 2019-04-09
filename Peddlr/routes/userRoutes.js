var express = require('express');
var router = express.Router();

var controller = require('../controllers/userControllers.js');

// Create new user
router.post('/newUser',controller.createUser);

// Find one user by id
router.get('/users/id/:id',controller.findOneUser);

//Find one user by name
router.get('/users/fname/:fname/lname/:lname',controller.findUserByName);


module.exports = router;