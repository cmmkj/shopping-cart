var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    title:{type: String,require:true},
    imagePath:{type:String,require:true},
    description: {type:String,require:true},
    price: {type:Number,require:true}
});

module.exports = mongoose.model('Product',schema);

