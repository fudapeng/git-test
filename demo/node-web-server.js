var http = require('http');
var url = require('url');
var util = require('util');
var qs = require('querystring');
var os = require('os');
var dns = require('dns');
var fs = require('fs');

//创建服务器
http.createServer(function(req,res){

	var pathname = url.parse(req.url).pathname;
	console.log('pathname:'+pathname);
	console.log(pathname.substr(1))
	fs.readFile(pathname.substr(1), function(err, data){
		if (err) {
			console.log(err)
			res.writeHead(404, {'Content-Type': 'text/html'});
		}else {
			res.writeHead(200, {'Content-Type': 'text/html'});

        	 // 响应文件内容
         	res.write(data.toString());
		};
		res.end()
	});

}).listen(3000);

console.log('server running')