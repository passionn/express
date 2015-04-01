var mongoose=require('mongoose');
var moveSchema=new mongoose.Schema({
	name:String,
	age:Number,
	sex:Number,
	salery:Number
});
/*moveSchema.pre('save',function(){
	if(this.isNew){

	}
});*/
moveSchema.static({
	fetch:function(cb){
		this.find({}).exec(cb);
		console.log(cb.arguments);
	},
	findById:function(cb){
		return this.findOne({_id:id}).exec(cb)
	}

});



module.exports=moveSchema;