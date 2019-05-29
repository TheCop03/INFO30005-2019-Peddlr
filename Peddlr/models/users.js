var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        "email":String,
        "fname":String,
        "lname":String,
        "address":String,
        "photo":String,
        "phoneNumber":Number,
        "password":String,
        "sessionId":String,
        "listings":Array
    }
);
mongoose.model('users',userSchema);
