//const io = require('socket.io')(80);
const express = require('express');
const http = require('http');
const app = express();


app.use(express.static('./public'));
const server = http.createServer (app);
const io = require('socket.io')(server);



io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log('user disconnected',socket.id);
  });

  socket.on('chat message', function(msg){
     io.emit('chat message', socket.id + ':' + msg);
  });
});


server.listen(5000);
