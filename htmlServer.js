var url = require('url');
var fs = require('fs');
var http = require('http');

var PORT = 8085;

var server = http.createServer(handleRequest);

function handleRequest(request, response) {
	response.end('The server works '+request.url);
}

server.listen(PORT, function() {
	console.log('Server is listening on: http://localhost:%s', PORT);
});

function displayRoot(url, request, response){
	