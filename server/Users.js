var config = require('../config');
var Twitch = require('./Twitch');
var JsonUtil = require('../util/JsonUtil');


const userList = (list) => {
    var array = Object.keys(list).map((val, i) => {
        return new Twitch(val);
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
           }) 
        });
    }
}