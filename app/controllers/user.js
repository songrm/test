
var User=require('../models/user') //导入 用户 models

// 登录list
exports.list=function (req, res) {
	User.fetch(function(err,user){
		if(err){
			console.log('报错信心='+err);
		}
		res.render('userlist',{
		  	title:'用户详情',
		  	user:user
		})
	})

}

exports.signup_y=function(req,res){
	res.render('signup',{
	  	title:'注册',
	  	
	  })
}
//注册
exports.signup=function(req,res){
	//获取表单数据
	var _user=req.body.user
	var user=new User(_user)

	user.save(function(err,user){
		if(err) {
			console.log(err)
		}
		res.redirect('/userlist')
	})
}

exports.signon_y=function(req,res){
	res.render('signon',{
	  	title:'登录',
	  	
	  })
}
//登录
exports.signon=function(req,res){
	//获取表单数据
	var _user=req.body.user
	var name=_user.name
	var password=_user.password
	User.findOne({name:name},function(err,user){
		if(err){
			console.log('报错信心='+err);
		}
		
		if(!user) return res.redirect('/')
		//匹配密码
		//console.log(user.password)
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log('报错信心='+err);
			}
			
			if(isMatch){
				//console.log(user)
				//console.log(req.session)
				req.session.user=user;
				console.log('匹配成功true')
				res.redirect('/userlist')
			}else{
				console.log('匹配失败false')
			}
		})

		
	})

	
}

//退出
exports.logout=function(req,res){
	//delete app.locals.user
	delete req.session.user
	res.redirect('/')
}

// 判断是否需要登录
exports.userSign=function(req,res,next){
	var _user=req.session.user;
	console.log('2323='+_user);
	if(!_user){
		res.redirect('/signon_y')
	}
	return next()
}
// //判断 权限控制
exports.userPress=function(req,res,next){
	var _user=req.session.user;
	if(_user.role<15){
		res.redirect('/signon_y')
		console.log('权限不够')
	}
	return next()

}


