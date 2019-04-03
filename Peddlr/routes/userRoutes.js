var express = require('express');
var router = express.Router();

var controller = require('../controllers/userControllers.js');

// Create new user
router.post('/api',controller.createUser);


// Find one user by id
router.get('/api/id/:id',controller.findOneUser);

//Find one user by name
//router.get('/api/fname/:fname',controller.findUserByName);


module.exports = router;