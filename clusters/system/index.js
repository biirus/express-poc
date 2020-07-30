const express = require('express');
const socket = require('socket.io');

const app = express();

app.get('/log', (req, res) => {
  res.json({ status: 'LOGGED' });
});

const server = app.listen(5000, () => {
  console.log('SYSTEM is listening at 5000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('System got socket connection');

  socket.on('log', (data, fn) => {
    fn(`Logy logy log!!! And yeah, here is your data: ${data}`);
  });
});
