var express = require('express');
var app = express();
var fs = require("fs");
var multer  = require('multer');
var bodParper = require('body-parser');
var cookieParser = require('cookie-parser')
var router = express.Router();


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodParper.urlencoded({ extended: false })
//加载静态资源
app.use(express.static('img'));
app.use(bodParper.urlencoded({ extended: false }));
app.use(multer({ dest: './tmp/'}).array('file'));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'tpl'));// 指定视图所在的位置
app.set('view engine', 'ejs');// 注册模板引擎

app.get('/user/:id',function(req,res){
	res.send()
})


app.get('/',function(req,res){
	console.log(22);
})

app.get('/uploader.html',function(req,res,next){
	console.log('cookies%', req.cookies);
	console.log(app.local)
	console.log(admin.mountpath);
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
//错误处理
app.use(function(err, req, res, next) {
	console.log('err')
  console.error(err.stack);
  res.status(500).send('error');
});

var server = app.listen(3333, function () {

  var host = server.address().address
  var port = server.address().port
  console.log(server.address());
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})