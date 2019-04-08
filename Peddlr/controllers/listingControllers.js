var mongoose = require('mongoose');
var Listing = mongoose.model('listing');

//create a new listing
var createListing = function(req,res){
    var listing = new Listing({
    		//"listingID": default????
    		"title":req.body.title,
        "price":req.body.price,
        "interval":req.body.interval, //look into this
        "description":req.body.description,
        "photo":req.body.photo,
        "owner":req.body.owner,
        "location":req.body.location, 
        "category":req.body.category
    });
    listing.save(function(err,newListing){
        if(!err){
            res.send(newListing); //if no errors, show the new listing
        }else{
            res.sendStatus(400);
        }
    });
};

//show all listings with the latest listing first
var showAllListings = function(req, res) {
	Listing.find({$orderby:{listingID: -1}}, function(err,listing){ 
        if(!err){
            res.send(listing); //if no errors send all the listings found
        }else{
            res.sendStatus(404);
        }
    });
};

//find a listing by searching its title
var findListingByName = function(req, res) {
	var Title = req.params.title;
	Listing.find({title:Title}, function(err, listing) {
		if(!err){
            res.send(listing); //if no errors send the listings found
        }else{
            res.sendStatus(404);
        }
	});
};

//show all the listings that are in a certain category
var showListingsByCategory = function(req, res) {
	var Category = req.params.category;
	Listing.find({category:Category}, function(err, results) {
		if (!err) {
			res.send(results);
		} else {
			res.sendStatus(404);
		}
	});
};

module.exports = {
		createListing,
		showAllListings,
		findListingByName,
		showListingsByCategory
}
