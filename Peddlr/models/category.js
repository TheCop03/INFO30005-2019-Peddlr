var mongoose = require('mongoose');
var categorySchema = mongoose.Schema(
    {
        "title":String,
        "photo":String,
    }
);
module.exports = mongoose.model('Category', categorySchema);
