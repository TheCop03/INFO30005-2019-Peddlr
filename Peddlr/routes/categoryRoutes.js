var express = require('express');
var router = express.Router();

var controller = require('../controllers/categoryControllers.js');

//create a new category
router.post('/newCategory',controller.createCategory);

//show all the categories
router.get('/categories',controller.showAllCategories); 

//search for a category
router.get('/categories/type/:type', controller.showCategoryByType);

module.exports = router;