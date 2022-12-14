const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const os = require('os');
let sistema =os.platform();
let tipo = os.type();
let usuario = os.hostname();
let memo = (os.freemem()/(1024*1024*1024));
let tmemo = (os.totalmem()/(1024*1024*1024));

let t1 = "<h1>El tipo de Sistema Operativo es: </h1>" + tipo + " .";
let t2 = "<h1>El la version de sistema utilizada es la siguiente: </h1>" + sistema + " .";
let t3 = "<h1>El nombre del usuario es el Siguiente: </h1>" + usuario + " .";
let t4 = "<h1>La memoria utilizada en GB es la Siguiente: </h1>" + memo + " .";
let t5 = "<h1>La memoria total en GB es la Siguiente: </h1>" + tmemo + " .";

const puerto = process.env.PORT || 8080;

const app = express();

const clientPath = `${__dirname}/client`;
console.log(`Server static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    sock.emit('message', t3);
    sock.emit('message', t1);
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