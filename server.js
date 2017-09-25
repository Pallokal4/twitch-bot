require('babel-register');
require("babel-core/register");
require("babel-polyfill");

var cron = require('./server/Cron');
var irc = require('./server/Irc');

cron.start();
irc.start();

require('./server.babel');
