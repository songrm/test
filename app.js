var express=require('express')  //引入express

var path=require('path')

var mongoose=require('mongoose')


var bodyParser = require('body-parser')

var cookieParser = require('cookie-parser');

var cookieSession = require('express-session');


var mongoStore=require('connect-mongo')({ session: cookieSession });  //mongo 回话持久化

var url='mongodb://127.0.0.1:27017/node';
var port=process.env.PORT || 3000  //设置端口

var app=express()
mongoose.Promise = global.Promise;
mongoose.connect(url,{useMongoClient: true})  //链接 数据库
app.set('views','./app/views/page') //设置路径
app.set('view engine','jade') //设置模版引擎
app.use(bodyParser.urlencoded({ extended: true }))//表单数据格式化
app.use(express.static(path.join(__dirname,'/static')))

var multipart = require('connect-multiparty'); //增加中间键
app.use(multipart());

// app.use(express.multipart())

// app.use(express.cookieParser())//session 的依赖项
// app.use(express.session({
// 	secret:'movies'
// })) //引入session

app.use(cookieParser());
app.use(cookieSession({
  secret:'movies',
  store:new mongoStore({
  	url:url,
  	collection:'session'
  })
  
}));

app.listen(port) //监听端口

console.log('服务启动') //判断是否成功启动 


// var connection=mongoose.connection;  
// connection.on('error',function(err){  
//     if(err){  
//         console.log(err);  
//     }  
// });  
// connection.on('open',function(){  
//     console.log('opened');  
// }); 


//配置路由

require('./config/router.js')(app)


