const express = require('express');
const httpProxy = require('http-proxy');
const socketClient = require('socket.io-client');
const socket = require('socket.io');

const app = express();
app.use(express.static('public'));

const proxy = httpProxy.createProxyServer();
const server = app.listen(3000, () => {
  console.log('CORE is listening at 3000');
});

const clusters = {
  iam: 'http://localhost:4000',
  system: 'http://localhost:5000',
};

const socketEvents = {
  iam: ['auth'],
  system: ['log'],
};

// PROXY WEB
Object.entries(clusters).forEach(([name, address]) => {
  app.use(`/${name}`, (req, res) => {
    proxy.web(req, res, { target: address });
  });
});

// CREATE SERVER <=> SERVER SOCKET CONNECTIONS
const serverSockets = Object.entries(clusters).reduce(
  (acc, [name, address]) => {
    acc[name] = socketClient(address);
    return acc;
  },
  {}
);

// just logs
Object.entries(serverSockets).forEach(([name, connection]) => {
  connection.on('connect', () => {
    console.log(`🖥 connect to the ${name}`);
  });
});

// CLIENT SOCKET CONNECTION
const io = socket(server);
io.on('connect', (clientSocket) => {
  console.log('📱 connect to the client');

  // FORWARD CLUSTER SOCKET EVENTS
  Object.entries(socketEvents).forEach(([name, events]) => {
    events.forEach((event) => {
      clientSocket.on(event, (data, fn) => {
        serverSockets[name].emit(event, data, fn);
      });
    });
  });
});
