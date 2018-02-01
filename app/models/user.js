var mongoose=require('mongoose')
var UserSchema=require('../schemas/user')

var User=mongoose.model('User',UserSchema) //生成模型

//导出构造函数
module.exports=User