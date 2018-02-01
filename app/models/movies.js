var mongoose=require('mongoose')
var MovieSchema=require('../schemas/movies')
//var Movie=mongoose.model('Movie',MovieSchema)

var Movie=mongoose.model('Movie',MovieSchema) //生成模型

//导出构造函数
module.exports=Movie