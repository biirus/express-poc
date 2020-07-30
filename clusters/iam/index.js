const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

app.get('/auth', (req, res) => {
  res.json({ status: 'OK' });
});

const server = app.listen(4000, () => {
  console.log('IAM is listening at 4000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('IAM got socket connection');

  socket.on('auth', (data, fn) => {
    console.log('IAM auth');
    fn(`Ok, you are signed in. Here is your initial data: ${data}`);
  });
});
