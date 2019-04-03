var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        "fname":String,
        "lname":String,
        "address":String,
        "photo":String
    }
);
mongoose.model('users',userSchema);
