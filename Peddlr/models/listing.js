var mongoose = require('mongoose');
var listingSchema = mongoose.Schema(
    {
        "id": String,
        "title":String,
        "price":Number,
        "interval":String, //look into this
        "description":String,
        "photo":String,
        "owner":String,
        "category":String,
        "created":Date
    }
);
mongoose.model('listing',listingSchema);
