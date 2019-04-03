var mongoose = require('mongoose');
var listingSchema = mongoose.Schema(
    {
        "title":String,
        "price":int,
    }
);
mongoose.model('listing',listingSchema);
