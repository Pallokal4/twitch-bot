var db = require('../server/Database.js');
var TwitchSchema = require('./twitch-schema');

var Twitch = db.model('Twitch', TwitchSchema);

module.exports = Twitch;