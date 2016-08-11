var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imagePath:'monkey.png',
        title:"小猴子",
        description:"小猴子",
        price:100000
    }),
    new Product({
        imagePath:'cat.png',
        title:"叮当猫",
        description:"叮当猫",
        price:120000
    }),
    new Product({
        imagePath:'pika.png',
        title:"皮卡丘",
        description:"皮卡丘",
        price:240000
    }),
    new Product({
        imagePath:'tree.png',
        title:"树",
        description:"一颗小树",
        price:5000
    }),
    new Product({
        imagePath:'sheep.png',
        title:"小羊",
        description:"一只小山羊",
        price:8000
    }),
    new Product({
        imagePath:'little_boy.png',
        title:"布偶",
        description:"一只布偶",
        price:10000
    }),
];

var done = 0;

for(var i = 0;i < products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
};




















