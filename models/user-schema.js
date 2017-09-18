var db = require('../server/Database.js');

var UserSchema = db.Schema({
    _id: true,
    username: {type:String, required: true },
    email: {type:String, required: true },
    twitchKey: {type:String, required: true }
}); 

module.exports = UserSchema;