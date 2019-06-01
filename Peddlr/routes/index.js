const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers.js');

router.get('/login', function(req, res){
    if (req.cookies.sessionId) {
        res.redirect('/');
    } else {
        controller.showLogin(req, res);
    }
});

router.get("/logout", function(req, res){
    res.cookie('sessionId', '');
    res.redirect('/');
});

router.get('/signup', function(req, res){
    if (req.cookies.sessionId) {
        res.redirect('/');
    } else {
        controller.showSignUp(req, res);
    }
});

router.get("/", controller.showHomepage);

router.post('/login', controller.loginUser);

router.post('/signup', controller.createUser);

module.exports = router;