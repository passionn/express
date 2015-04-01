var mongoose=require('mongoose');
var moveSchema=require('./moveSchema');

var move=mongoose.model('movie',moveSchema);

module.exports=move;