var db = require('../server/Database.js');
var TwitchSchema = require('./twitch-schema');

var Twitch = db.model('Twitch', TwitchSchema);
/*
Twitch.find({}, function (err, docs) {
                            console.log("wat :0", err, docs);
                          });
*/
module.exports = Twitch;