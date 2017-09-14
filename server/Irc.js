var IRC = require('irc-framework');
var Config = require('../config');

var bot = new IRC.Client();
bot.connect({
	host: Config.twitchHost,
	nick: Config.twitchNick,
        password: Config.twitchOauth
});

bot.on('registered', function() {
	console.log('Connected!');
	var channel = bot.channel('#pallokala');
	channel.join();
	channel.say('Beep beep Im a sheep');
	channel.updateUsers(function() {
		console.log(channel.users);
	});
});

bot.on('close', function() {
	console.log('Connection close');
});

bot.on('message', function(event) {
	console.log('<' + event.target + '>', event.nick, event.message);
});


bot.matchMessage(/^!hi/, function(event) {
	event.reply('sup');
});

bot.on('whois', function(event) {
	console.log(event);
});

bot.on('join', function(event) {
	console.log('user joined', event);
});

bot.on('userlist', function(event) {
	console.log('userlist for', event.channel, event.users);
});

bot.on('part', function(event) {
	console.log('user part', event);
});
