var mongoose = require('mongoose');
var listingSchema = mongoose.Schema(
    {
        "title":String,
        "price":Number,
        "interval":String, //look into this
        "description":String,
        "photo":String,
        "owner":Number,
        "location":String 
    }
);
mongoose.model('listing',listingSchema);
