// Create web server
// To run: node comments.js
// To test: curl -d "user=1&comment=This is a comment" http://localhost:3000/comments

var http = require('http');
var querystring = require('querystring');
var url = require('url');

var comments = [];

function addComment(req, res) {
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    var comment = querystring.parse(body);
    comments.push(comment);
    res.writeHead(200);
    res.end();
  });
}

function getComments(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(comments));
}

function handleRequest(req, res) {
  var parsedUrl = url.parse(req.url);
  if (parsedUrl.pathname === '/comments') {
    switch (req.method) {
      case 'POST':
        addComment(req, res);
        break;
      case 'GET':
        getComments(req, res);
        break;
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

var server = http.createServer(handleRequest);
server.listen(3000);
console.log('Server running at http://localhost:3000/');