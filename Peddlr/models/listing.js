var mongoose = require('mongoose');
var listingSchema = mongoose.Schema(
    {
        "listingID": Number, //how do to this default
    		"title":String,
        "price":Number,
        "interval":String, //look into this
        "description":String,
        "photo":String,
        "owner":Number,
        "location":String, 
        "category":Number
    }
);
mongoose.model('listing',listingSchema);
