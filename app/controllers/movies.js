var Movies=require('../models/movies') //导入 models
var fs=require('fs')
var path=require('path')

var _=require('underscore')

//详情
	exports.det= function (req, res) {
		var id=req.params.id
		Movies.select(id,function(err,movie){
			if(err){
				console.log('报错信心='+err);
			}
			res.render('det',{
			  	title:'详情',
			  	movie:movie
			  })

		})
	}

	// 修改 
	exports.mod= function (req, res) {
		var id=req.params.id
		
		Movies.select(id,function(err,movie){
			if(err){
				console.log('报错信心='+err);
			}
			
			res.render('mod',{
			  	title:'详情',
			  	movie:movie
			  })

		})
	}
	// 添加
	exports.up= function (req, res) {
		var id=req.params.id
		
		res.render('up',{
		  	title:'详情',
		  	movie:{
		  		_id:'',
		  		_txt:'',
		  		_det:''
		  	}
		  })
	}


	// 修改 提交
	exports.news=function (req, res) {
		var movieObj = req.body.movie
		var id=movieObj._id
		var _movie;
		if(req.poster){
			movieObj.poster=req.poster
		}
		//console.log(id)
		if(id!='undefined'){
			Movies.select(id,function(err,movie){
				if(err){
					console.log('修改报错了'+err)
				}
				_movie=_.extend(movie,movieObj)
				
				_movie.save(function(err,movie){
						if(err){
							console.log('报错信心02='+err);
						}
						res.redirect('/det/'+movie._id)

					})

				})
		}
	}

	// 添加 提交
	exports.adds=function (req, res) {
		var movieObj = req.body.movie
		var id=movieObj._id
		var _movie;
		if(req.poster){
			movieObj.poster=req.poster
		}

		_movie = new Movies({
			_id:movieObj._id,
			_txt:movieObj._txt,
			_det:movieObj._det,
			poster:req.poster,
		})
		_movie.save(function(err,movie){
			if(err){
				console.log('报错信心02='+err);
			}
			res.redirect('/det/'+movie._id)
		})
		
	}

	//删除
	exports.delete=function(req,res){
		console.log("delete begin");
		var id=req.params.id
		
		if(id){
			Movies.remove({_id:id},function(err,movie){
				if(err){
					
					res.json({success:0});
				}else{
					res.json({success:1});
				}
			})
		}else{
			console.log('删除失败')
		}
	}
	exports.saveimg=function(req,res,next){
		
		var imgDate=req.files.upload_img
		var filePath=imgDate.path
		var originalFilename=imgDate.originalFilename
		if(originalFilename){
			fs.readFile(filePath,function(err,data){
				var timestamp=Date.now()//时间
				var type=imgDate.type.split('/')[1]//图片类型
				var poster=timestamp+'.'+type  //拼new名称
				var newpath=path.join(__dirname,'../../','/static/img/'+poster)
				fs.writeFile(newpath,data,function(err){
					console.log(newpath)
					req.poster=poster
					next()
				})
			})
		}
		else{
			console.log('没有上传文件')
		}
		
	}
