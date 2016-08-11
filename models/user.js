
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userchema = new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
});



userchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};


userchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};


module.exports = mongoose.model('User',userchema);









