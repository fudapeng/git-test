var express = require('express');
var app = express();
var fs = require("fs");
var multer  = require('multer');
var bodParper = require('body-parser');
var cookieParser = require('cookie-parser')



// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodParper.urlencoded({ extended: false })
//加载静态资源
app.use(express.static('img'));
app.use(bodParper.urlencoded({ extended: false }));
app.use(multer({ dest: './tmp/'}).array('file'));
app.use(cookieParser());

app.get('/',function(req,res){
	console.log(22);
})

app.get('/uploader.html',function(req,res){
	console.log('cookies%', req.cookies);
	res.sendFile(__dirname + "/uploader.html");
})
//posh请求
app.post('/test-post',urlencodedParser,function(req,res){
	var data = {
		name: req.body.name,
		password: req.body.paw
	}
	console.log(req.body);
	res.end(JSON.stringify(req.body));
})
//上传
app.post('/test-upload', function (req, res) {
   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully',
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  console.log(server.address());
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})