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
                    var results = {title: 'Peddlr', 'listings': listings,
                     'categories': categories, session: req.cookies.sessionId};
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
    var results = {title: 'Peddlr', error: ''};
    res.render('signup', results);
};

var showSettings = function(req, res) {
    var results = {title: 'Peddlr', session: req.cookies.sessionId};
    res.render('settings', results);
};
var showPrivacy = function(req, res) {
    var results = {title: 'Peddlr', session: req.cookies.sessionId};
    res.render('privacy.pug', results);
};

var showLogin = function(req, res) {
    var results = {title: 'Peddlr', error: ""};
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

const showListingByID = function(req, res) {
    var ID = req.params.id;
    Listing.findById(ID, function(err, listing) {
        if(!err){
            User.findById(listing.owner, function(err, owner){
              if (!err){
                var sid = req.cookies.sessionId;
                User.find({sessionId: sid}, function(err, currUser){
                    if (!err){
                        var results = {listing: listing, owner: owner, user: currUser[0]};
                        res.render('listing', results);
                    } else {
                        res.sendStatus(400);
                    }
                });
              }else{
                res.sendStatus(404);
              }
            });
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
                //No user found (or double account error)
                // just say wrong user/pass
                res.sendStatus(401);
            } else {
                bcrypt.compare(password, user[0].password, function (err, same){
                    if (same) {
                        let sidrequest = utils.generate_unique_sid();
                        sidrequest.then(function (sid) {
                            user[0].sessionId = sid;
                            user[0].save();
                            res.cookie("sessionId", sid).redirect("/homepage");
                        });
                    } else {
                        var message = "Wrong credentials. Please try again.";
                        var results = {title: 'Peddlr', error: message}
                        res.render('login', results);
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
    if (req.body.photo == null){
        console.log("no file");
    }
    else {
        var reader = new FileReader();

        console.log("file exists");
    }
    var listing = new Listing({
        "title":req.body.title,
        "price":req.body.price,
        "interval":req.body.interval, //look into this
        "description":req.body.description,
        "photo":req.body.photo,
        "category":req.body.category
    });

    var sid = req.cookies.sessionId;

    User.find({sessionId:sid}, function(err, user){
        if (!err){
            listing.owner = user[0].id;
            listing.save(function(err, newListing){
                if (!err){
                    user[0].listings.push(listing.id);
                    user[0].save();
                    showHomepage(req, res);
                } else {
                    res.sendStatus(400);
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
    console.log(req.file);
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
			var results = {title: 'Peddlr', category: category.title,
             'listings': listings, session: req.cookies.sessionId}
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
            Listing.find({owner:user[0]._id}, function(err, listings){
                if (!err){
                    var results = {titel: 'Peddlr', category: 'My Listings',
                     'listings': listings}
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
            "address":req.body.address.concat(", ", req.body.state, " ",
             req.body.zip, ", ", req.body.country),
            "photo":req.body.photo,
            "phoneNumber":req.body.phoneNumber,
            "password":hash
        });
        // Check if the email already exists
        User.find({email: req.body.email}, function(err, users){
            if (!err){
                if(users.length != 0){
                    var message = "Email address already in use. Please log in.";
                    var results = {title: 'Peddlr', error: message};
                    res.render('signup', results);
                }
                else{
                    user.save(function(err,newUser){
                        if(!err){
                            //if there are no errors, show the new user
                            showHomepage(req,res)
                        }else{
                            res.sendStatus(400);
                        }
                    });
                }
            }
            else {
                res.sendStatus(400);
            }
        });
    });
};


var deleteListing = function(req,res){
    console.log(req.body);
    var listingID = req.body.listing_id;
    Listing.deleteOne({_id: listingID}, function(err, results) {
        if (!err) {
            res.redirect("/mylistings")
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
    createUser,
    showHomepage,
    showSignUp,
    showLogin,
    loginUser,
    showListingByID,
    showCreateListing,
    showSettings,
    showListingsByUser,
    showPrivacy
};
