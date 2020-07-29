const express = require('express');

const app = express();

app.get('/log', (req, res) => {
  res.json({ status: 'LOGGED' });
});

app.listen(5000, () => {
  console.log('SYSTEM is listening at 5000');
});
