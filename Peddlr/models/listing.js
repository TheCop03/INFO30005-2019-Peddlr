var mongoose = require('mongoose');
var listingSchema = mongoose.Schema(
    {
        "title":String,
        "price":Number,
        "interval":String, //look into this
        "description":String,
        "photo":String,
        "owner":String,
        "location":String,
        "category":String
    }
);
mongoose.model('listing',listingSchema);
