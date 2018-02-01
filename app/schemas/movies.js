var mongoose=require('mongoose')  //引入模块

var MovieSchema=new mongoose.Schema({
	_id:Number,
	_txt:String,
	_det:String,
	poster:String,
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
MovieSchema.pre('save',function (next) {
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt=Date.now();
	}
	next() //存储流程 走下去
})

//创建一个静态方法，只有实例化之后 才会调用
MovieSchema.statics={
	fetch:function(cd){
		return this
			.find({}) //查找所有数据
			.sort()
			.exec(cd) //执行回调方法
	},
	findById:function(cd){
		return this
			.findOne({"_id":id}) //查找所有数据
			
			.exec(cd) //执行回调方法
	},
	select:function(id,cd){
		
		return this
			.findOne({"_id":id}) //查找
			.exec(cd) //执行回调方法
	},
	
}
//导出
module.exports=MovieSchema
