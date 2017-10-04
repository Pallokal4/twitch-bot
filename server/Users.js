var config = require('../config');
var Twitch = require('./Twitch');
var JsonUtil = require('../util/JsonUtil');
var twitchdb = require ('../models/twitch');
var User = require ('../models/user');
var moment = require('moment');


class Users {
    constructor(users){
        this.users = users;
    }
    
    checkOnline(){
        this.users.forEach((val, i) => {
           val.checkOnline().then((res) => {
               var isOnline = JsonUtil.isOnline(res);
               var onlineTime = val.getStreamOnline();
               if(isOnline && !val.getIsOnline()){
                   val.setStreamOnline(moment().format());
               }
               val.setIsOnline(isOnline);
               
               if(!isOnline && onlineTime){
                   var data = new twitchdb({
                        user: val.user,
                        type: "apionline",
                        data: {start: onlineTime, end: moment().format()}
                    });
                    data.save();
                   val.setStreamOnline(null);
                   
               }
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
                    data.save();
                }); 
           }
        });
    }
}
/*
var derp = new Users();
console.log(derp.users);

setTimeout(function(){
    console.log(derp.users);
}, 2000);*/

module.exports = Users;