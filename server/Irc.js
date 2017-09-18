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


bot.on('registered', function() {
	console.log('Connected!');
	var channel = bot.channel('#pallokala');
	channel.join();
});

bot.on('message', function(event) {
        saveData(event, 'message');
	//console.log('<' + event.target + '>', event.nick, event.message, event);
});

bot.on('join', function(event) {
	saveData(event, 'join');
});

bot.on('part', function(event) {
        saveData(event, 'part');
});

bot.on('close', function() {
	console.log('Connection close');
});

const saveData = (event, type) => {
    if(event.target){
    var data = new twitchdb({
                        user: event.target.replace("#", ""),
                        type: type,
                        data: event
                    });
    data.save();
    }
};

module.exports = {
    start: () => {
        bot.connect({
            host: Config.twitchHost,
            nick: Config.twitchNick,
            password: Config.twitchOauth
        });
    }
}