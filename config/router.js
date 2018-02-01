// var Movies=require('../models/movies') //导入 models
// var User=require('../models/user') //导入 用户 models
// var _=require('underscore')

var Index=require('../app/controllers/index')
var Movies=require('../app/controllers/movies')
var User=require('../app/controllers/user')
module.exports=function(app){
	app.use(function(req, res,next){
		console.log(req.session.user)
		var _user=req.session.user;
		
		app.locals.user=_user
		
		return next()
	})
	//首页
	app.get('/',Index.index)
	//电影列表
	app.get('/det/:id',Movies.det)
	app.get('/mod/:id',Movies.mod)
	app.get('/up',Movies.up)
	app.post('/news', Movies.news)
	app.post('/adds',Movies.saveimg,Movies.adds)
	app.delete('/:id',User.userSign,User.userPress,Movies.delete)
	//用户列表
	app.get('/userlist',User.userSign,User.userPress,User.list)
	app.post('/signup',User.signup)
	app.post('/signon',User.signon)
	app.get('/logout',User.logout)
	app.get('/signup_y',User.signup_y)
	app.get('/signon_y',User.signon_y)
	

	// app.get('/', function (req, res) {
			
	// 	Movies.fetch(function(err,movies){
	// 		if(err){
	// 			console.log('报错信心='+err);
	// 		}
	// 		res.render('index',{
	// 		  	title:'首页',
	// 		  	movies:movies
	// 		  })

	// 	})
	// })
	
	// app.get('/det/:id', function (req, res) {
	// 	var id=req.params.id
	// 	Movies.select(id,function(err,movie){
	// 		if(err){
	// 			console.log('报错信心='+err);
	// 		}
	// 		res.render('det',{
	// 		  	title:'详情',
	// 		  	movie:movie
	// 		  })

	// 	})
	// })

	// // 修改 
	// app.get('/mod/:id', function (req, res) {
	// 	var id=req.params.id
		
	// 	Movies.select(id,function(err,movie){
	// 		if(err){
	// 			console.log('报错信心='+err);
	// 		}
			
	// 		res.render('mod',{
	// 		  	title:'详情',
	// 		  	movie:movie
	// 		  })

	// 	})
	// })
	// // 添加
	// app.get('/up', function (req, res) {
	// 	var id=req.params.id
		
	// 	res.render('up',{
	// 	  	title:'详情',
	// 	  	movie:{
	// 	  		_id:'',
	// 	  		_txt:'',
	// 	  		_det:''
	// 	  	}
	// 	  })
	// })


	// // 修改 提交
	// app.post('/news', function (req, res) {
	// 	var movieObj = req.body.movie
	// 	var id=movieObj._id
	// 	var _movie;
	// 	//console.log(id)
	// 	if(id!='undefined'){
	// 		Movies.select(id,function(err,movie){
	// 			if(err){
	// 				console.log('修改报错了'+err)
	// 			}
	// 			_movie=_.extend(movie,movieObj)
				
	// 			_movie.save(function(err,movie){
	// 					if(err){
	// 						console.log('报错信心02='+err);
	// 					}
	// 					res.redirect('/det/'+movie._id)

	// 				})

	// 			})
	// 	}
	// })

	// // 添加 提交
	// app.post('/adds', function (req, res) {
	// 	var movieObj = req.body.movie
	// 	var id=movieObj._id
	// 	var _movie;
		
	// 	_movie = new Movies({
	// 		_id:movieObj._id,
	// 		_txt:movieObj._txt,
	// 		_det:movieObj._det,
	// 	})
	// 	_movie.save(function(err,movie){
	// 		if(err){
	// 			console.log('报错信心02='+err);
	// 		}
	// 		res.redirect('/det/'+movie._id)
	// 	})
		
	// })

	// //删除
	// app.delete('/:id',function(req,res){
	// 	console.log("delete begin");
	// 	var id=req.params.id
		
	// 	if(id){
	// 		Movies.remove({_id:id},function(err,movie){
	// 			if(err){
					
	// 				res.json({success:0});
	// 			}else{
	// 				res.json({success:1});
	// 			}
	// 		})
	// 	}else{
	// 		console.log('删除失败')
	// 	}
	// })
	// 登录list
	// app.get('/userlist', function (req, res) {
	// 	User.fetch(function(err,user){
	// 		if(err){
	// 			console.log('报错信心='+err);
	// 		}
	// 		res.render('userlist',{
	// 		  	title:'用户详情',
	// 		  	user:user
	// 		})
	// 	})

	// })
	// //注册
	// app.post('/signup',function(req,res){
	// 	//获取表单数据
	// 	var _user=req.body.user
	// 	var user=new User(_user)	
	// 	user.save(function(err,user){
	// 		if(err) {
	// 			console.log(err)
	// 		}
	// 		res.redirect('/userlist')
	// 	})
	// })
	// //登录
	// app.post('/signon',function(req,res){
	// 	//获取表单数据
	// 	var _user=req.body.user
	// 	var name=_user.name
	// 	var password=_user.password
	// 	User.findOne({name:name},function(err,user){
	// 		if(err){
	// 			console.log('报错信心='+err);
	// 		}
			
	// 		if(!user) return res.redirect('/')
	// 		//匹配密码
	// 		//console.log(user.password)
	// 		user.comparePassword(password,function(err,isMatch){
	// 			if(err){
	// 				console.log('报错信心='+err);
	// 			}
				
	// 			if(isMatch){
	// 				//console.log(user)
	// 				//console.log(req.session)
	// 				req.session.user=user;
	// 				console.log('匹配成功true')
	// 				res.redirect('/userlist')
	// 			}else{
	// 				console.log('匹配失败false')
	// 			}
	// 		})

			
	// 	})

		
	// })

	// //退出
	// app.get('/logout',function(req,res){
	// 	delete app.locals.user
	// 	delete req.session.user
	// 	res.redirect('/')
	// })
}
