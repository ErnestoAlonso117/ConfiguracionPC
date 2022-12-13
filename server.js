const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const os = require('os');
let sistema =os.platform();
let usuario = os.hostname();
let memo = (os.freemem()/(1024*1024*1024));
let tmemo = (os.totalmem()/(1024*1024*1024));

let t2 = "El tipo de sistema es el Siguiente: " + sistema + " .";
let t3 = "El nombre del usuario es el Siguiente: " + usuario + " .";
let t4 = "La memoria utilizada en GB es la Siguiente: " + memo + " .";
let t5 = "La memoria total en GB es la Siguiente: " + tmemo + " .";

const puerto = process.env.PORT || 8080;

const app = express();

const clientPath = `${__dirname}/client`;
console.log(`Server static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    sock.emit('message', 'Se ha conectado');
    sock.emit('message', t3);
    sock.emit('message', t2);
    sock.emit('message', t4);
    sock.emit('message', t5);
});

server.on('error', (err) => {
    console.error('server error: ', err);
});


server.listen(puerto, () => {
    console.log('Server Conectado en ' + puerto);
});