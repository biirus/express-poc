const express = require('express');
const request = require('request');

const app = express();

app.use('/iam', (req, res, next) => {
  const url = req.url.replace('http://localhost:3000/iam');
  req.pipe(request(`http://localhost:4000${url}`)).pipe(res);
});

app.use('/system', (req, res, next) => {
  const url = req.url.replace('http://localhost:3000/system');
  req.pipe(request(`http://localhost:5000${url}`)).pipe(res);
});

app.listen(3000, () => {
  console.log('CORE is listening at 3000');
});
