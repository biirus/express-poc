const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

app.use('/iam', function (req, res) {
  proxy.web(req, res, { target: `http://localhost:4000` });
});

app.use(`/socket.io`, function (req, res) {
  proxy.web(req, res, { target: `http://localhost:4000/socket.io` });
});

// proxy the socket.io WS requests
app.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

app.listen(3000, () => {
  console.log('CORE is listening at 3000');
});
