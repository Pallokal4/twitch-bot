require('babel-register');
require("babel-core/register");
require("babel-polyfill");

var cron = require('./server/Cron');
var irc = require('./server/Irc');
var discord = require('./server/Discord');

cron.start();
irc.start();
discord.start();

require('./server.babel');
