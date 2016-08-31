var http = require('http');
var fs = require('fs');
// 用于请求的选项
var options = {
   host: '127.0.0.1',
   port: '8081',
   path: '/uploader.html'
};

// 处理响应的回调函数
var callback = function(response){
   // 不断更新数据
   var body = '';
   // response.on('data', function(data) {
   //    body += data;
   // });

   response.on('end', function() {
      // 数据接收完成
      console.log(body);
   });
   response.on('err',function(){
   	console.log('err');
   })
   process.on('uncaughtException', function(err) {
	console.log(err);
	});
}
// 向服务端发送请求
var req = http.request(options, callback);
req.end();