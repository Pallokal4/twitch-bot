var IRC = require('irc-framework');
var Config = require('../config');
var bot = new IRC.Client();
var User = require ('../models/user');
var twitchdb = require ('../models/twitch');

function Middleware() {
	return function(client, raw_events, parsed_events) {
		client.requestCap(':twitch.tv/membership');
	}
}

async function users() {
    var users = [];
    await User.find({}, (err, docs) => {
        users = docs.map((val, i) => {
             return val.username
        })
    });
    return users;
}

var userlist = [];


bot.use(Middleware());


bot.on('registered', function() {
	console.log('Connected!');
        userlist.map((val, i) => {
            var channel = bot.channel('#'+val);
            channel.join();
            channel.say(':3');
        })
	//var channel = bot.channel('#pallokala');
	//channel.join();
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
    start: async () => {
        userlist = await users();
        bot.connect({
            host: Config.twitchHost,
            nick: Config.twitchNick,
            password: Config.twitchOauth
        });
    }
}