var IRC = require('irc-framework');
var Config = require('../config');
var bot = new IRC.Client();
var twitchdb = require ('../models/twitch');

function Middleware() {
	return function(client, raw_events, parsed_events) {
		client.requestCap(':twitch.tv/membership');
	}
}

bot.use(Middleware());

bot.connect({
	host: Config.twitchHost,
	nick: Config.twitchNick,
        password: Config.twitchOauth
});


bot.on('registered', function() {
	console.log('Connected!');
	var channel = bot.channel('#pallokala');
	channel.join();
});

bot.on('close', function() {
	console.log('Connection close');
});

bot.on('message', function(event) {
        var data = new twitchdb({
                        user: event.target.replace("#", ""),
                        type: "message",
                        data: event
                    });
        data.save();
        console.log("bot raw", bot.raw('NAMES', "#pallokala"));
	//console.log('<' + event.target + '>', event.nick, event.message, event);
});

bot.on('join', function(event) {
	var data = new twitchdb({
                        user: event.target.replace("#", ""),
                        type: "join",
                        data: event
                    });
        data.save();
});

bot.on('part', function(event) {
	var data = new twitchdb({
                        user: event.target.replace("#", ""),
                        type: "part",
                        data: event
                    });
        data.save();
});
