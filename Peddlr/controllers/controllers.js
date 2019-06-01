const mongoose = require('mongoose');
const utils = require('./utils.js');
const Category = require('../models/category');
const Listing = require('../models/listing');
const User = require('../models/users');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var showHomepage = function(req, res) {
    //find all categories
    Category.find(function(err,categories){
        if(!err){
            //find all the listings
            Listing.find({}, function(err,listings){
                if(!err){
                    if (req.cookies.sessionId){
                        User.findOne({sessionId:req.cookies.sessionId},function(err,user){
                            var results = {title: 'Peddlr', 'listings': listings,
                            'categories': categories, session: req.cookies.sessionId, name: user.fname};
                            res.render('homepage', results);
                        })
                    } else {
                        var results = {title: 'Peddlr', 'listings': listings,
                            'categories': categories};
                        res.render('homepage', results);
                    }

                }else{
                    res.sendStatus(404);
                }
            }).sort({"created":-1});
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
    var sid = req.cookies.sessionId;
    User.findOne({sessionId: sid}, function(err, user){
        if (!err){
            var results = {title: 'Peddlr', session: sid, user: user};
            res.render('settings', results);
        }
    });
};
var showPrivacy = function(req, res) {
    var results = {title: 'Peddlr', session: req.cookies.sessionId};
    res.render('privacy.pug', results);
};

var showDeleteUser = function(req, res) {
    var results = {title: 'Peddlr', session: req.cookies.sessionId, error: ''};
    res.render('deleteAccount', results)
}

var showLogin = function(req, res) {
    var results = {title: 'Peddlr', error: ""};
    res.render('login', results);
};

var showCreateListing = function(req, res) {
    Category.find(function(err,categories){
        if(!err){
            var results = {title: 'Peddlr', 'categories': categories, session: req.cookies.sessionId};
            res.render('newlisting', results);
        }else{
            res.sendStatus(404);
        }
    });
};

var showListingByID = function(req, res) {
    var ID = req.params.id;
    Listing.findById(ID, function(err, listing) {
        if(!err){
            User.findById(listing.owner, function(err, owner){
              if (!err){
                var sid = req.cookies.sessionId;
                User.find({sessionId: sid}, function(err, currUser){
                    if (!err){
                        Category.find({}, function(err, categories){
                            if (!err){
                                var results = {listing: listing, owner: owner,
                                     user: currUser[0], categories: categories, session: sid};
                                res.render('listing', results);
                            } else {
                                res.sendStatus(400);
                            }
                        });
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
                var message = "Wrong credentials. Please try again.";
                var results = {title: 'Peddlr', error: message}
                res.render('login', results);
            } else {
                bcrypt.compare(password, user[0].password, function (err, same){
                    if (same) {
                        let sidrequest = utils.generate_unique_sid();
                        sidrequest.then(function (sid) {
                            user[0].sessionId = sid;
                            user[0].save();
                            res.cookie("sessionId", sid).redirect("/");
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

    var listing = new Listing({
        "title":req.body.title,
        "price":req.body.price,
        "interval":req.body.interval, //look into this
        "description":req.body.description,
        "photo":req.body.b64,
        "category":req.body.category
    });

    var sid = req.cookies.sessionId;
    // Get current date and time
    var today = new Date();

    listing.created = today;

    User.find({sessionId:sid}, function(err, user){
        if (!err){
            listing.owner = user[0]._id;
            listing.save(function(err, newListing){
                if (!err){
                    user[0].listings.push(listing._id);
                    user[0].save();
                    res.redirect('/homepage');
                } else {
                    res.sendStatus(400);
                }
            });
        } else {
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
            if (!err){
                Category.find({}, function(err, categories){
                    if (!err){
                        var results = {title: 'Peddlr', category: category.title,
                         categoryID: category._id, categories: categories,
                          'listings': listings, session: req.cookies.sessionId}
                        res.render('category', results);
                    } else {
                        res.sendStatus(500);
                    }
                });
            }
		});
	});
};

//show all the listings of the logged in user
var showListingsByUser = function(req, res) {
    User.find({sessionId: req.cookies.sessionId}, function(err, user){
        if (!err){
            Listing.find({owner:user[0]._id}, function(err, listings){
                if (!err){
                    var results = {title: 'Peddlr', category: 'My Listings', 'listings': listings, 'user': user[0]._id,
                        session: req.cookies.sessionId};
                    res.render('category', results);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(500);
        }
    });
};

//create a new user
var createUser = function(req,res){
    if (req.body.password.length < 8){
        var message = "Password must be more than 7 characters";
        var results = {title: 'Peddlr', error: message,
         email: req.body.email, fname: req.body.fname,
          lname: req.body.lname, address: req.body.address, state: req.body.state,
           zip: req.body.zip};
        res.render('signup', results);
    } else {
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
                        var results = {title: 'Peddlr', error: message,
                         email: req.body.email, fname: req.body.fname,
                          lname: req.body.lname};
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
    }
};

var editUser = function(req, res){
    User.findOne({sessionId:req.cookies.sessionId}, function(err, user) {
        if (!err && user) {
            if (req.body.fname.length > 0) {user.fname = req.body.fname;}
            if (req.body.lname.length > 0) {user.lname = req.body.lname;}
            if (req.body.email.length > 0) {user.email = req.body.email;}
            if (req.body.address.length > 0) {
                user.address = req.body.address.concat(", ", req.body.state, " ", req.body.zip, ", ", req.body.country);
            }
            user.save(function(err, updatedUser) {
                if (updatedUser) {
                    let message = "Your account has been updated.";
                    let results = {title: 'Peddlr', error: message}
                    res.render('settings', results);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.cookie('sessionId', '');
            res.redirect('/login')
        }
    });
};

var deleteUser = function(req, res){
    var sid = req.cookies.sessionId;
    var username = req.body.username;
    var pw = req.body.password;

    User.find({email: username}, function(err, user){
        if(!err){
            if (user.length != 1) {
                var message = "Wrong credentials. Please try again.";
                var results = {title: 'Peddlr', error: message}
                res.render('deleteAccount', results);
            } else {
                bcrypt.compare(pw, user[0].password, function (err, same){
                    if (same) {
                        user[0].listings.forEach(function(element){
                            console.log(element);
                            Listing.findById(element, function(err, listing){
                                listing.remove();
                            });
                        });
                        user[0].remove();
                        res.redirect('/logout');
                    } else {
                        var message = "Wrong credentials. Please try again.";
                        var results = {title: 'Peddlr', error: message}
                        res.render('deleteAccount', results);
                    }
                });
            }
        }else{
            // Redirect back to login with server error bubble
            res.sendStatus(500);
        }
    });
}

var editPassword = function(req, res){
    User.findOne({sessionId:req.cookies.sessionId}, function(err, user) {
        if (req.body.password.length < 8) {
            let message = "Your password must be at least 8 characters.";
            let results = {title: 'Peddlr', error: message}
            res.render('privacy', results);
        }
        else if (!err && user) {
            bcrypt.hash(req.body.password, saltRounds, function(hasherr, hash) {
                user.password = hash;
                user.save(function(err, updatedUser) {
                    if (updatedUser) {
                        let message = "Your account has been updated.";
                        let results = {title: 'Peddlr', error: message}
                        res.render('privacy', results);
                    } else {
                        res.sendStatus(500);
                    }
                });
            });
        } else {
            res.cookie('sessionId', '');
            res.redirect('/login')
        }
    });
};

var deleteListing = function(req,res){
    var listingID = req.body.listing_id;
    Listing.findById(listingID, function(err, listing){
        if (!err){
            User.findById(listing.owner, function(err, user){
                if (user.sessionId != req.cookies.sessionId){
                    res.sendStatus(401);
                } else if (!err && user){
                    var delIndex = user.listings.indexOf(listingID);
                    var removed = user.listings.splice(delIndex, 1);
                    user.save(function(err, updatedUser){
                        if (updatedUser){
                            Listing.deleteOne({_id: listingID}, function(err, results) {
                                if (!err) {
                                    res.redirect("/mylistings")
                                } else {
                                    res.sendStatus(500);
                                }
                            });
                        } else {
                            res.sendStatus(500);
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(500);
        }
    });
};

var updateListing = function(req, res){
    var listingID = req.body.listing_id;

    Listing.findById(listingID, function(err, listing){
        if (!err){
            User.findOne({sessionId:req.cookies.sessionId}, function (err, user) {
               if (err || !user || user._id !== listing.owner) {
                   res.sendStatus(401);
               }
            });
            listing.title = req.body.title;
            listing.category = req.body.category;
            listing.price = req.body.price;
            listing.interval = req.body.interval;
            listing.description = req.body.description;

            listing.save(function(err, updatedListing){
                if (!err){
                    res.redirect(`/listing/id/${listingID}`);
                } else {
                    res.sendStatus(400);
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
}

var searchListing = function(req, res) {
    var input = req.params.input;
    var regex = new RegExp(input, 'i');
    Listing.find({"title": regex}, function(err, listings) {
        if(!err){
            res.json(listings);
        }else{
            res.sendStatus(404);
        }
    });
};

var search = function(req, res) {
    var input = req.param('input');
    var regex = new RegExp(input, 'i');
    Listing.find({"title": regex}, function(err, listings) {
        var results = {title: 'Peddlr', category: 'Search Results', 'listings': listings, session: req.cookies.sessionId}
        if (!err) {
            res.render('category', results);
        } else {
            res.sendStatus(404);
        }
    });
};

var searchListingByCategory = function(req, res) {
    var input = req.params.input;
    var title = req.params.title;
    var regex = new RegExp(input, 'i');
    Listing.find({"title": regex, "category": title}, function(err, listings) {
        if(!err) {
            res.json(listings);
        }else{
            res.sendStatus(404);
        }
    });
};

var searchListingByUser = function(req, res) {
    var input = req.params.input;
    var user = req.params.user;
    var regex = new RegExp(input, 'i');
    Listing.find({"title": regex, "owner": user}, function(err1, listings) {
        if (!err1) {
            res.json(listings);
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports = {
    createListing,
    deleteListing,
    updateListing,
    findListingByName,
    showListingsByCategory,
    createUser,
    deleteUser,
    showHomepage,
    showSignUp,
    showLogin,
    loginUser,
    showListingByID,
    showCreateListing,
    showSettings,
    showListingsByUser,
    showPrivacy,
    showDeleteUser,
    editUser,
    editPassword,
    searchListing,
    search,
    searchListingByCategory,
    searchListingByUser
};
