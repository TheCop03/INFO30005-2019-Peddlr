var mongoose = require('mongoose');
var Users = mongoose.model('users');

var createUser = function(req,res){
    var user = new User({
        "fname":req.body.fname,
        "lname":req.body.lname,
        "address":req.body.address,
        "photo":req.body.photo
    });
    newUser.save(function(err,newUser){
        if(!err){
            res.send(newUser);
        }else{
            res.sendStatus(400);
        }
    });
};

var findOneUser = function(req,res){
    var userInx = req.params.id;
    Users.findById(userInx,function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};

//var findUserByName = function(req, res){
//    var userFName = req.params.fname;
//    var userLName = req.params.lname;
//    Cafe.find({fname:userFName},function(err,user){
//        if(!err){
//            res.send(cafeName);
//        }else{
//            res.sendStatus(404);
//        }
//    });
//};

module.exports.createUser = createUser;
module.exports.findOneUser = findOneUser;
//module.exports.findCafeByName = findCafeByName;