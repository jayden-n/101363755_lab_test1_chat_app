const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder

app.use(express.static(path.join(__dirname, 'public')));

// Run when a clietn connects
io.on('connection', (socket) => {
	// console.log('new ws connectiion');

	// welcome current user
	socket.emit('message', 'Welcome to Chat Buddy');

	// notify to the current user that another user just connects
	socket.broadcast.emit('message', 'A user just joined the chat');

	// this runs when client disconnects
	socket.on('disconnect', () => {
		io.emit('message', 'A user has left the chat :(');
	});
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
