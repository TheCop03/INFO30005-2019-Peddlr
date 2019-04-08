var mongoose = require('mongoose');
var Users = mongoose.model('users');

//create a new user
var createUser = function(req,res){
    var user = new User({
        "fname":req.body.fname,
        "lname":req.body.lname,
        "address":req.body.address,
        "photo":req.body.photo,
        "phoneNumber":req.body.phoneNumber
    });
    user.save(function(err,newUser){
        if(!err){
            res.send(newUser); //if there are no errors, show the new user 
        }else{
            res.sendStatus(400);
        }
    });
};

//lame function
var findOneUser = function(req,res){
    var userInx = req.params.id;
    Users.findById(userInx,function(err,foundUser){
        if(!err){
            res.send(foundUser); //if no errors, show the found user
        }else{
            res.sendStatus(404);
        }
    });
};

//find user by searching full first and last name
var findUserByName = function(req, res){
    var userFName = req.params.fname;
    var userLName = req.params.lname;
    Users.find({fname:userFName, lname: userLName},function(err,results){
        if(!err){
            res.send(results);
        }else{
            res.sendStatus(404);
        }
    });
};

//makes the functions public so your routes can access them
//only export functions you need to use outside of this file
module.exports = {
		createUser,
		findOneUser,
		findUserByName
};
