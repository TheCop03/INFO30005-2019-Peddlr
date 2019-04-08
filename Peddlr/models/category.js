var mongoose = require('mongoose');
var categorySchema = mongoose.Schema(
    {
        "type":String,
        //what else?
    }
);
mongoose.model('category',categorySchema);
