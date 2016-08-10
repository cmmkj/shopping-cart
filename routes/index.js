var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');
var Csurf = require('csurf');


var csrfProtection = Csurf();

/* GET home page. */
router.use(csrfProtection);

router.get('/', function(req, res, next) {
    Product.find(function(err,docs){
        var productChucks = [];
        var chuckSize = 3;
        for(var index = 0;index < docs.length;index += chuckSize){
            productChucks.push(docs.slice(index,index + chuckSize));
        }
        res.render('shop/index', {
            title: '购物车', 
            products:productChucks
        });
    });
    
});


router.get('/user/signup',function(req,res,next){
    res.render('user/signup',{
        csrfToken: req.csrfToken() 
    });
});


router.post('/user/signup',function(req,res,next){
    res.redirect('/');
});



module.exports = router;














