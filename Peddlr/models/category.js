var mongoose = require('mongoose');
var categorySchema = mongoose.Schema(
    {
        "categoryID":Number,
        "title":String,
        "photo":String,
    }
);
mongoose.model('category',categorySchema);
