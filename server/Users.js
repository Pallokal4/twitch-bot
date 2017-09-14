var config = require('../config');
var Twitch = require('./Twitch');
var JsonUtil = require('../util/JsonUtil');
var twitchdb = require ('../models/twitch');


const userList = (list) => {
    var array = Object.keys(list).map((val, i) => {
        var obj = new Twitch(val);
        return obj;
    }) || [];
    return array;
}

class Users {
    constructor(){
        this.users = userList(config.users);

    }
    
    checkOnline(){
        this.users.forEach((val, i) => {
           val.checkOnline().then((res) => {
               val.setIsOnline(JsonUtil.isOnline(res));
           }); 
        });
    }
    
    saveData(){
        this.users.forEach((val, i) => {
            console.log("isonline", val.isOnline);
           if(val.isOnline){
              val.checkOnline().then((res) => {
                    var data = new twitchdb({
                        user: val.user,
                        type: "api",
                        data: res.stream
                    });
                    data.save().then((val) => {
                        twitchdb.find({}, function (err, docs) {
                            console.log("wat :0", err, docs);
                          });
                    })
                }); 
           }
        });
    }
}
/*
var derp = new Users();
derp.checkOnline();
setTimeout(function(){
    derp.saveData();
}, 2000);
*/
module.exports = Users;