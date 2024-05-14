const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
 
const { url } = require('inspector');
const { error } = require('console');

let activeUsers = new Map();
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', ConnectedUser) 


function ConnectedUser(socket) {
   socket.on('Username', data=>{
      activeUsers.set(socket.id, data.name);
      console.log(data.name);
      io.emit('total-user', activeUsers.size)
      io.emit('new-user', data.name)
   })
   

   socket.on('disconnect', () => {
      activeUsers.delete(socket.id);
      io.emit('total-user', activeUsers.size)
   });
   socket.on('total-user', (message) => {
      // Broadcast the message to all connected clients
      socket.broadcast.emit('receive-message', { username: activeUsers.get(socket.id), message });
   })
}

 
const PORT = process.env.PORT || 5500;
   server.listen(PORT, () => {
      console.log(`Server is running on : ${PORT}`);
   });

