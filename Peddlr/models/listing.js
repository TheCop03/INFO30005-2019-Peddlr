var mongoose = require('mongoose');
var user = require('users.js');
var listingSchema = mongoose.Schema(
    {
        "title":String,
        "price":int,
        "interval":String, //look into this
        "description":String,
        "photo":String,
        "owner":user,
        "location":String 
    }
);
mongoose.model('listing',listingSchema);
