var url = require('url');

var http = require('http');

var PORT = 8085;

var server = http.createServer(handleRequest);

server.listen = (PORT, function() {
	console.log('Server is listening on http://localhost:%s', PORT);
});

function handleRequest(request, response) {
	var urlParts = url.parse(request.url);
	console.log(urlParts);
}


function displayRoot(url, request, response){
	var myHTML = "<html>";
	myHTML += "<body><h1>Home Page</h1>";
	myHTML += "<a href='/portfolio'"
	myHTML +=
	myHTML +=
	myHTML +=
}