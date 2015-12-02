var fs = require('fs');
var uploadPath = __dirname + '/uploads/'
var socketIO = require('socket.io')
var io = {};

function sendFiles(socket) {
  fs.readdir(uploadPath, function(err, files) {
    if(err) throw err;

    files = files.map(function(file) {
      f = fs.readFileSync(uploadPath + file);
      return new Buffer(f).toString('base64')
    });

    console.log('read all files', files.length);
    socket.emit('files:all', JSON.stringify(files));
  });
}

function addFile(socket, file) {
  console.log('started add new file');
  try {
    var name = uploadPath + new Date() + '.jpeg'
    var image = new Buffer(file, 'base64')

    fs.writeFile(name, image, function(error) {
      if(error) throw error;

      console.log('wrote file', name);
    });
  } catch (e) {
    console.log('error', e);
  }
}

function broadcastFile(socket, file) {
  console.log('broadcast file');
  socket.broadcast.emit('files:added', file)
}

module.exports = function(app) {
  io = socketIO(app);

  io.on('connection', function(socket) {
    console.log('new client connected');
    sendFiles(socket);

    socket.on('files:new', function(data) {
      addFile(socket, data);
      broadcastFile(socket, data);
    });

    socket.on('disconnect', function() {
      console.log('client disconnected');
    })
  });
}
