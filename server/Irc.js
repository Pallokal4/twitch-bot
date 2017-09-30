var IRC = require('irc-framework');
var Config = require('../config');
var bot = new IRC.Client();
var User = require ('../models/user');
var twitchdb = require ('../models/twitch');
var moment = require('moment');

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

var channelUsers = {};


bot.use(Middleware());


bot.on('registered', function() {
        userlist.map((val, i) => {
            var user = val.toLowerCase();
            var channel = bot.channel('#'+user);
            channel.join();
        })
	//var channel = bot.channel('#pallokala');
	//channel.join();
});

bot.on('message', function(event) {
        saveData(event.target, 'message', event);
	//console.log('<' + event.target + '>', event.nick, event.message, event);
});

bot.on('join', function(event) {
        var channel = event.channel.replace("#", "");
        var obj = channelUsers[channel] || {};
        obj[event.nick] = {join: moment().format()};
        channelUsers[channel] = obj;
        console.log("join", channelUsers);
});

bot.on('part', function(event) {
        var channel = event.channel.replace("#", "");
        if(channelUsers[channel]){
            if(channelUsers[channel][event.nick].join){
                console.log("save joinpart", {nick: event.nick, join: channelUsers[channel][event.nick].join, part: moment().format()});
                saveData(event.channel, 'joinpart', {nick: event.nick, join: channelUsers[channel][event.nick].join, part: moment().format()});
                channelUsers[channel][event.nick] = null;
            }
        }
        console.log("part", event);
});

bot.on('close', function() {
	console.log('Connection close');
});

const saveData = (channel, type, event) => {
    if(channel){
    var data = new twitchdb({
                        user: channel.replace("#", ""),
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