var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');
var Cart = require('../models/cart');





/* GET home page. */
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


router.get('/add-to-cart/:id',function(req,res,next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart:{});
    
    Product.findById(productId,function(err,product){
        if(err){
            return res.redirect('/');
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        console.log(cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart',function(req,res,next){
    if(!req.session.cart){
        return res.render('shop/shopping-cart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice})
});

module.exports = router;














