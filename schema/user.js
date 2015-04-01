var mongoose=require('mongoose');

var UserSchema=new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	email:String,
	password:String	
});

UserSchema.static({
	findAll:function(callback){
		this.find({}).exec(callback);
	},
	findById:function(name,callback){
		this.findOne({name:name}).exec(callback);
	},
	findUserLimit:function(limit,callback){
		this.find({}).limit(limit).exec(callback);
	}
});

UserSchema.methods={
	comparePassword:function(password){
		if(this.password==password){
			return true;
		}else{
			return false;
		}
	}
};

module.exports=UserSchema;