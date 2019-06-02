var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        "email":String,
        "fname":String,
        "lname":String,
        "address":String,
        "photo":String,
        "phone":Number,
        "password":String,
        "sessionId":String,
        "listings":Array
    }
);
module.exports = mongoose.model('User', userSchema);
