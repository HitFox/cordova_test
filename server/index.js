var http = require('http');
var fs = require('fs');
var uploadPath = __dirname + '/uploads/'

function server(req, res) {
  var data = '';

  console.log('got request', req.method);

  req.on('data', function(chunk) {
    data += chunk.toString();
  });

  req.on('end', function() {
    try {
      var body = JSON.parse(data);
      var name = uploadPath + new Date() + '.jpeg'
      var image = new Buffer(body.image, 'base64')

      fs.writeFile(name, image, function(error) {
        if(error) throw error;

        console.log('wrote file', name);
      });
    } catch (e) {
      console.log('error', e);
    } finally {
      res.end()
    }
  });
}

http.createServer(server).listen(9000, function() {
  console.log('started at 9000');
});
