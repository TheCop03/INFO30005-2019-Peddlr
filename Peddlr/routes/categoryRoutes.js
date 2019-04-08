var express = require('express');
var router = express.Router();

var controller = require('../controllers/categoryController.js');

//create a new category
router.post('/peddlr',controller.createCategory);

//show all the categories
router.get('/peddlr',controller.showAllCategories);

//search for a category
router.get('/peddlr/type/:type', controller.showCategoryByType);

module.exports = router;