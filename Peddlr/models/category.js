var mongoose = require('mongoose');
var categorySchema = mongoose.Schema(
    {
        "categoryID":Number,
        "title":String,
        "photo":String,
        //what else
    }
);
mongoose.model('category',categorySchema);
