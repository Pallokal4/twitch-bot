var db = require('../server/Database.js');

var TwitchSchema = db.Schema({
    username: {type:String, required: true },
    created: {type: Date, default: Date.now}
    
}); 

module.exports = TwitchSchema;