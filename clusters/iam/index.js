const express = require('express');

const app = express();

app.get('/auth', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/*', (req, res) => {
  console.log(req.url);
  res.json({ status: 'All pages' });
});

app.listen(4000, () => {
  console.log('IAM is listening at 4000');
});
