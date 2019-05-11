var mongoose = require('mongoose');
var Grid = require("gridfs-stream");
Grid.mongo = mongo;
var upload = multer({dest: "./uploads"});
var Category = mongoose.model('category');
var Listing = mongoose.model('listing');
var User = mongoose.model('users');


var showHomepage = function(req, res) {
    //find all categories
    Category.find(function(err,categories){
        if(!err){
            //find all the listings
            Listing.find({}, function(err,listings){
                if(!err){
                    var results = {title: 'Peddlr', 'listings': listings, 'categories': categories};
                    res.render('homepage', results);
                }else{
                    res.sendStatus(404);
                }
            });
        } else {
            res.sendStatus(404);
        }
    });
};

var showSignUp = function(req, res) {
    var results = {title: 'Peddlr'};
    res.render('signup', results);
};

var showAboutUs = function(req, res) {
    var results = {title: 'Peddlr'};
    res.render('aboutus', results);
};

var showLogin = function(req, res) {
    var results = {title: 'Peddlr'};
    res.render('loginpage', results);
};
var showCreateListing = function(req, res) {
    Category.find(function(err,categories){
        if(!err){
            var results = {title: 'Peddlr', 'categories': categories};
            res.render('createlisting', results);
        }else{
            res.sendStatus(404);
        }
    });
};

const showListingByID = function(req, res) {
    var ID = req.params.id;
    Listing.findById(ID, function(err, listing) {
        if(!err){
            res.render('listing', {listing: listing}); //if no errors send the listings found
        }else{
            res.sendStatus(404);
        }
    });
};

//login the user and show their profile
var loginUser = function(req, res) {
    var username = req.body.email;
    var Password = req.body.password;
    Users.find({email:username, password: Password},function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};


//create a new listing
var createListing = function(req,res){
    var listing = new Listing({
        "title":req.body.title,
        "price":req.body.price,
        "interval":req.body.interval, //look into this
        "description":req.body.description,
        "photo":req.body.photo,
        "owner":req.body.owner,
        "location":req.body.location,
        "category":req.body.category
    });

    listing.save(function(err,newListing){
        if(!err){
            showHomepage(req, res); //if no errors, show the new listing
        }else{
            res.sendStatus(400);
        }
    });
};


//find a listing by searching its title
var findListingByName = function(req, res) {
    var Title = req.params.title;
    Listing.find({title:Title}, function(err, listing) {
        if(!err){
            res.send(listing); //if no errors send the listings found
        }else{
            res.sendStatus(404);
        }
    });
};


//show all the listings that are in a certain category
var showListingsByCategory = function(req, res) {
    var Category = req.params.category;
    Listing.find({category:Category}, function(err, results) {
        if (!err) {
            res.send(results);
        } else {
            res.sendStatus(404);
        }
    });
};


//create a new user
var createUser = function(req,res){
    var user = new User({
        "email":req.body.email,
        "fname":req.body.fname,
        "lname":req.body.lname,
        "address":req.body.address,
        "photo":req.body.photo,
        "phoneNumber":req.body.phoneNumber,
        "password":req.body.password
    });
    user.save(function(err,newUser){
        if(!err){
            showHomepage(req,res) //if there are no errors, show the new user
        }else{
            res.sendStatus(400);
        }
    });
};


//find user by searching full first and last name
var findUserByName = function(req, res){
    var userFName = req.params.fname;
    var userLName = req.params.lname;
    User.find({fname:userFName, lname: userLName},function(err,results){
        if(!err){
            res.send(results);
        }else{
            res.sendStatus(404);
        }
    });
};


var deleteListing = function(req,res){
    var listingName = req.body.title;
    console.log(listingName);
    Listing.deleteOne({title:listingName}, function(err, results) {
        if (!err) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });
};

var uploadimage = function(req, res, next) {
    gfs = Grid(db);
    var ss = req.files;
    for(var j=0; j<ss.length; j++){
        var originalName = ss[j].originalname;
        var filename = ss[j].filename;
        var writestream = gfs.createWriteStream({
            filename: originalName
        });
        fs.createReadStream("./uploads/" + filename).pipe(writestream);
    }
}



module.exports = {
    createListing,
    deleteListing,
    findListingByName,
    showListingsByCategory,
    findUserByName,
    createUser,
    showHomepage,
    showSignUp,
    showAboutUs, 
    showLogin,
    loginUser,
    showListingByID,
    showCreateListing,
    uploadimage
};
