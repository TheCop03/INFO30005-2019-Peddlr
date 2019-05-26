const mongoose = require('mongoose');
const utils = require('./utils.js');
const Category = mongoose.model('category');
const Listing = mongoose.model('listing');
const User = mongoose.model('users');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

var showSettings = function(req, res) {
    var results = {title: 'Peddlr'};
    res.render('settings', results);
};

var showAboutUs = function(req, res) {
    var results = {title: 'Peddlr'};
    res.render('aboutus', results);
};

var showLogin = function(req, res) {
    var results = {title: 'Peddlr'};
    res.render('login', results);
};
var showCreateListing = function(req, res) {
    Category.find(function(err,categories){
        if(!err){
            var results = {title: 'Peddlr', 'categories': categories};
            res.render('newlisting', results);
        }else{
            res.sendStatus(404);
        }
    });
};

var showLoggedInHomepage = function(req, res) {
    //find all categories
    Category.find(function(err,categories){
        if(!err){
            //find all the listings
            Listing.find({}, function(err,listings){
                if(!err){
                    var results = {title: 'Peddlr', 'listings': listings, 'categories': categories};
                    res.render('loggedin', results);
                }else{
                    res.sendStatus(404);
                }
            });
        } else {
            res.sendStatus(404);
        }
    });
};


const showListingByID = function(req, res) {
    var ID = req.params.id;
    Listing.findById(ID, function(err, listing) {
        if(!err){
            User.findById(listing.owner, function(err, owner){
              if (!err){
                var results = {listing: listing, owner: owner};
                res.render('listing', results);
              }else{
                res.sendStatus(404);
              }
            });
            //res.render('listing', {listing: listing}); //if no errors send the listings found
        }else{
            res.sendStatus(404);
        }
    });
};

//login the user and show their profile
var loginUser = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.find({email:username},function(err,user){
        if(!err){
            if (user.length != 1) {
                //No user found (or double account error, shouldn't happen anyway), just say wrong user/pass
                res.sendStatus(401);
            } else {
                bcrypt.compare(password, user[0].password, function (err, same) {
                    if (same) {
                        let sidrequest = utils.generate_unique_sid();
                        sidrequest.then(function (sid) {
                            console.log(sid);
                            user[0].sessionId = sid;
                            user[0].save();
                            res.cookie("sessionId", sid).redirect("/homepage");
                        });
                    } else {
                        res.status(401);
                        res.send('wrong password'); // Redirect back to login with wrong password bubble
                    }
                });
            }
        }else{
            // Redirect back to login with server error bubble
            res.sendStatus(500);
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
            var sid = req.cookies.sessionId;
            User.find({sessionId:sid}, function(err, user){
                if (!err){
                    user[0].listings.push(listing.id);
                    user[0].save();
                    showHomepage(req, res);
                } else {
                    res.sendStatus(400);
                }
            });
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
	var myCategory = req.params.category;
	Listing.find({category:myCategory}, function(err, listings) {
		Category.findById(myCategory, function(err, category){
			var results = {title: 'Peddlr', category: category.title, 'listings': listings}
			if (!err) {
				res.render('category', results);
			} else {
				res.sendStatus(404);
			}
		});
	});
};

//show all the listings of the logged in user
var showListingsByUser = function(req, res) {
	var sid = req.cookies.sessionId;
    User.find({sessionId:sid}, function(err, user){
        if (!err){
            Listing.find({owner:user._id}, function(err, listings){
                if (!err){
                    var results = {titel: 'Peddlr', category: 'My Listings', 'listings': listings}
                    res.render('category', results);
                } else {
                    res.sendStatus(400);
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
};

//create a new user
var createUser = function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let user = new User({
            "email":req.body.email,
            "fname":req.body.fname,
            "lname":req.body.lname,
            "address":req.body.address.concat(", ", req.body.state, " ", req.body.zip, ", ", req.body.country),
            "photo":req.body.photo,
            "phoneNumber":req.body.phoneNumber,
            "password":hash
        });
        user.save(function(err,newUser){
            if(!err){
                showHomepage(req,res) //if there are no errors, show the new user
            }else{
                res.sendStatus(400);
            }
        });
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
    Listing.deleteOne({title:listingName}, function(err, results) {
        if (!err) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });
};

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
    showSettings,
    showLoggedInHomepage,
    showListingsByUser
};
