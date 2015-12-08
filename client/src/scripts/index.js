var io = require('socket.io-client');

function addImage(file) {
  console.log('add file to dom');
  $images = document.getElementById('images');
  $image = document.createElement('img')
  $image.className = 'image-grid__item'

  $image.src = "data:image/jpeg;base64," + file;
  $images.appendChild($image);
}

function onReady() {
  console.log('ready');
  # TODO: make dynamic or change to your server address
  var socket = io('http://172.18.50.50:9000');

  socket.on('files:all', function(files) {
    console.log('got files', files);
    files = JSON.parse(files);
    for (var i = 0; i < files.length; i++) {
      addImage(files[i]);
    }
  });

  socket.on('files:added', function(file) {
    console.log('file added', file);
    addImage(file);
  });

  document.getElementById('upload').onclick = function() {
    function onSuccess(dataURI) {
      console.log('success');
      socket.emit('files:new', dataURI);
      addImage(dataURI);
    }

    function onError(message) {
      console.log('failed', message);
    }

    navigator.camera.getPicture(onSuccess, onError, {destinationType: navigator.camera.DestinationType.DATA_URL});
  }
}

document.addEventListener('deviceready', onReady, false);
