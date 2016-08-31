var fs = require("fs");
var buf = new Buffer(1024);

console.log("准备打开文件！");
fs.open('data.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("截取20字节后的文件内容。");
   // 截取文件
   fs.ftruncate(fd, 10, function(err){
      if (err){
         console.log(err);
      }
      console.log("文件截取成功。");
      console.log("读取相同的文件");
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
         if (err){
            console.log(err);
         }
         // 仅输出读取的字节
         if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
         }

        // fs.write(fd,'haha!',0,'utf8',function(){

        // })
         // 关闭文件
         fs.close(fd, function(err){
            if (err){
               console.log(err);
            }
            console.log("文件关闭成功！");
         });
      });
   });
});
/*监听文件改变*/
fs.watchFile('data.txt', function(cur,prev){
  console.log('watchFile:'+cur)
  for( var a in prev){
    console.log(prev[a])
  }
});
function unlink(){
	fs.unlink('output.txt',function(err){
		if (err) {console.log('del err')};
		console.log('del');
	})
}
function readdir(){
	fs.readdir('/demo/', function(err,files){
		files.forEach( function (file){
	       console.log( file );
	   });
	});
}

/*fs.stat('data.txt', function(err, stats) {
   if (err) {
       return console.error(err);
   }
  console.log(stats);

});*/
/*var rs = fs.createReadStream('data.txt');
var ws = fs.createWriteStream('output.txt');
rs.setEncoding('UTF8');

rs.pipe(ws);*/

module.exports = {
	unlink : unlink,
	readdir : readdir
}
