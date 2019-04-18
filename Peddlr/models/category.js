var mongoose = require('mongoose');
var categorySchema = mongoose.Schema(
    {
        "title":String,
        "photo":String,
    }
);
mongoose.model('category',categorySchema);
