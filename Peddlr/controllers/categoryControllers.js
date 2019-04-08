var mongoose = require('mongoose');
var Category = mongoose.model('category');

var createCategory = function(req,res){
    var category = new Category({
        "type":req.body.type
    });
    category.save(function(err,newCat){
        if(!err){
            res.send(newCat); //if no errors, show the new cat
        }else{
            res.sendStatus(400);
        }
    });
};

var showAllCategories = function(req, res) {
	Category.find(function(err,category){
        if(!err){
            res.send(category); //if no errors send all the cats found
        }else{
            res.sendStatus(404);
        }
    });
};

var showCategoryByType = function(req, res) {
	var Type = req.params.type;
	Category.find({type:Type}, function(err, results) {
		if (!err) {
			res.send(results); 
		} else {
			res.sendStatus(404);
		}
	});
};

module.exports = {
		createCategory,
		showAllCategories,
		showCategoryByType
}
