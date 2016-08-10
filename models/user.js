
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userchema = new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
});

module.exports = mongoose.model('User',userchema);

