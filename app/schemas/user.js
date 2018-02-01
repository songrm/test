var mongoose=require('mongoose')  //引入模块
var bcrypt=require('bcrypt')
var SALT_WORK_FACTOR=10

var UserSchema=new mongoose.Schema({
	id:String,
	name:{
		unique:true,
		type:String
	},
	password:{
		
		type:String
	},
	role:{
		///1～20 普通用户 21～35 管理员 36～50 超级管理员
		type:Number
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

//每次在存储之前都会调用这个方法
UserSchema.pre('save',function (next) {
	var user=this;
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt=Date.now();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,slat){
		if(err) return next(err)
		bcrypt.hash(user.password,slat,function(err,hash){
			if(err) return next(err)
			//console.log(hash)
			user.password=hash
			next()
		})

	})
	//next() //存储流程 走下去
})

UserSchema.methods = {
    comparePassword: function(_password, cb) {
    	

	    bcrypt.compare(_password, this.password, function(err, isMatch) {
	    	console.log(_password+'==='+this.password);
	      if (err) return cb(err)
	      console.log('isMatch==='+isMatch)
	      cb(null, isMatch)
	    })
  }
}





//创建一个静态方法，只有实例化之后 才会调用
UserSchema.statics={
	fetch:function(cd){
		return this
			.find({}) //查找所有数据
			.sort()
			.exec(cd) //执行回调方法
	},
	select:function(name,cd){
		return this
			.find({'name':name}) //查找所有数据
			.sort()
			.exec(cd) //执行回调方法
	}
	
}
//导出
module.exports=UserSchema
