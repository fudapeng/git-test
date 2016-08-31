var http = require("http");
var url = require("url");
var util = require('util');

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

function route (pathname) {
	console.log('route'+ pathname);
}
 start(route);
 console.log(__filename)

 /*
 process
  */
console.log(process.memoryUsage());
/*
util
 */
function Person() {
	this.name = 'byvoid';
	this.toString = function() {
	return this.name;
	};
}
var obj = new Person();
console.log(new Date().getTime());