import express from 'express';
var fallback = require('express-history-api-fallback')
const path = require('path');


var bodyParser = require('body-parser');
var root = path.resolve(__dirname, 'public');


const app = express();

app.use(bodyParser.json() );
app.use('/api/users', require('./routes/users'));
app.use('/api/twitch', require('./routes/twitch'));

app.use(express.static(root));

app.use(fallback('index.html', { root: root }));

app.listen(process.env.PORT || 3000);

