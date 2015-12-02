var http = require('http');
var socket = require(__dirname + '/socket')

function server(req, res) {
  console.log('got request', req.method, req.headers.origin);

  // NOTE: Only for demo purposes allow any origin
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.end();
}

app = http.createServer(server).listen(9000, function() {
  console.log('started at 9000');
});

socket(app)
