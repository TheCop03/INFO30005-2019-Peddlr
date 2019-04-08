var mongoose = require('mongoose');
var categorySchema = mongoose.Schema(
    {
        "type":String,
        //what else?
        //icon?
    }
);
mongoose.model('category',categorySchema);
