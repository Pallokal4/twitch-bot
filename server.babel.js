import express from 'express';

var bodyParser = require('body-parser');

const path = require('path');
const app = express();

app.use(bodyParser.json() );
app.use('/api/users', require('./routes/users'));

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000);
