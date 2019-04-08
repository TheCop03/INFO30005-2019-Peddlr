var express = require('express');
var router = express.Router();

var controller = require('../controllers/categoryController.js');

//create a new category
router.post('/api',controller.createCategory);

//show all the categories
router.get('/api',controller.showAllCategories);

//search for a category
router.get('/api/type/:type', controller.showCategoryByType);

module.exports = router;