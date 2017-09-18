var db = require('../server/Database.js');

var TwitchSchema = db.Schema({
    user: {type:String, required: true },
    type: {type:String, required: true },
    data: {type:"Mixed", required: true },
    created: {type: Date, default: Date.now}
}); 

module.exports = TwitchSchema;