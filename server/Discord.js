var Discord = require('discord.io');
var Config = require('../config');

var bot = new Discord.Client({
    token: Config.discordId,
    autorun: false
});

var streamchannels = [];

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    if(message === "/watchstreams"){
        streamchannels.push(channelID);
        bot.sendMessage({
            to: channelID,
            message: "watching streams on this channel"
        });
    }
});

bot.on('streamonline', function(twitch) {
    streamchannels.forEach((val, i) => {
        var message = twitch.user + "is online! http://twitch.tv/"+twitch.user
        bot.sendMessage({
            to: val,
            message: message
        });
    })
});

module.exports = {
    start: () => {
        bot.connect();
    },
    bot: bot
}

