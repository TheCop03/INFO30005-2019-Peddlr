var mongoose = require('mongoose');
var Listing = mongoose.model('listing');

var createListing = function(req,res){
    var listing = new Listing({
        "title":req.body.title,
        "price":req.body.price,
    });
    listing.save(function(err,newListing){
        if(!err){
            res.send(newListing); //if no errors, show the new listing
        }else{
            res.sendStatus(400);
        }
    });
};

var showAllListings = function(req, res) {
	Listing.find(function(err,listing){
        if(!err){
            res.send(listing); //if no errors send all the listings found
        }else{
            res.sendStatus(404);
        }
    });
}

module.exports = {
		createListing
		showAllListings
}
