var http=require('http');

var querystring=require('querystring');
var Promise=require('Promise');
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function(request, response){

	// response.writeHead(200,{'Content-Type':'text/plain'});
	// response.end('hello world2323');
	var body='';
	request.on('data',function(chunk){
		body+=chunk;
	})
	request.on('end',function(){
		body=querystring.parse(body);
		response.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
		if(body.name&&body.url){
			response.write('网站名:'+body.name)
			response.write('<br>')
			response.write('网站URL:'+body.url)
		}else{
			response.write(postHTML)
		}
		response.end();
	})

}).listen(3434);
var url='http://www.imooc.com/learn/937';

function filler_f(filler_txt){
	var ed=filler_txt
	return rd
}

// http.get(url,function(res){
// 	var html='';
// 	res.on('data',function(data){
// 		html+=data;
// 	})
// 	res.on('end',function(){
// 		//console.log(filler_f(html));
// 		//console.log(html)  
// 	})
// }).on('error',function(){
// 	console.log('报错了');
// })


function getpage(url){
	return new Promise(function(resolve,reject){
		console.log('正在爬取'+url);
		http.get(url,function(res){
			var html='';
			res.on('data',function(data){
				html+=data;
			})
			res.on('end',function(){
				resolve(html)
				//console.log(filler_f(html));
				//console.log(html)  
			})
		}).on('error',function(e){
			reject(e)
			//console.log('报错了');
		})
	})
}


// 安装的插件 bluebird



var fs=require('fs');
var data='';
var readerstream=fs.createReadStream('txt.txt');
readerstream.setEncoding('UTF8');
readerstream.on('data',function(chunk){
	data+=chunk;
});
readerstream.on('end',function(){
	console.log(data)
})

var xier='我是写入的内容';
var writestream=fs.createWriteStream('txt.txt');
writestream.write(xier,'UTF8');
writestream.end();
writestream.on('finish',function(){
	console.log('写入完成');
})
writestream.on('error',function(err){
	console.log(err.stack);
})




var EventEmitter=require('events').EventEmitter;
var event=new EventEmitter();
event.on('some',function(){
	console.log('some 事件触发啦')
})
setTimeout(function(){
	event.emit('some');
},1000)

console.log('server running at http://127.0.0.1:3434');