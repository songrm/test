var Movies=require('../models/movies') //导入 models


exports.index=function(req, res){	
	Movies.fetch(function(err,movies){
		if(err){
			console.log('报错信心='+err);
		}
		res.render('index',{
		  	title:'首页',
		  	movies:movies
		  })
	})
}
