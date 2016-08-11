var express = require('express');
var router = express.Router();
var passport = require('passport');
var Product = require('../models/product.js');
var Csurf = require('csurf');

var csrfProtection = Csurf();

/* GET home page. */
router.use(csrfProtection);

router.get('/profile',isLoggined,function(req,res,next){
    res.render('user/profile');
});

router.get('/logout',function(req,res,next){
    req.logout();
    res.redirect('/');
});

router.use('/',notLoggined,function(req,res,next){
    next();
});

router.get('/signup',function(req,res,next){
    var messages = req.flash('error');
    res.render('user/signup',{
        csrfToken: req.csrfToken(),
        messages:messages,
        hasErrors:messages.length > 0
    });
});


router.post('/signup',
    passport.authenticate('local.signup',{
        successRedirect:'/user/profile',
        failureRedirect:'/user/signup',
        failureFlash:true
    }),function(req,res,next){

});



router.get('/login',function(req,res,next){
    var messages = req.flash('error');
    res.render('user/login',{
        csrfToken: req.csrfToken(),
        messages:messages,
        hasErrors:messages.length > 0
    });
});

router.post('/login',
    passport.authenticate('local.login',{
        successRedirect:'/user/profile',
        failureRedirect:'/user/login',
        failureFlash:true
    }),function(req,res,next){

});



module.exports = router;

function isLoggined(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};


function notLoggined(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};













