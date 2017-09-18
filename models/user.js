var db = require('../server/Database.js');
var UserSchema = require('./twitch-schema');

var User = db.model('User', UserSchema);

module.exports = User;