require('babel-register');
var cron = require('./server/Cron');
var irc = require('./server/Irc');

cron.start();
irc.start();

require('./server.babel');
