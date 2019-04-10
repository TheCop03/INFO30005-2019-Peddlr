var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        // userID or userName?
    		"email":String,
        "fname":String,
        "lname":String,
        "address":String,
        "photo":String,
        "phoneNumber":String,
        "password":String
    }
);
mongoose.model('users',userSchema);
