var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        "fname":String,
        "lname":String,
        "address":String,
        "photo":String,
        "phoneNumber":String
    }
);
mongoose.model('users',userSchema);
