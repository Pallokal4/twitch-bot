var curl = require('curlrequest');
var config = require('../config');

const queryURL = (user) => {
    const root = "https://api.twitch.tv/kraken";
    return {
        channel: root+"/channels/"+ user,
        stream: root+"/streams/"+ user,
        user: root +"/users?login="+user
    };
}

class Twitch {
    constructor(user){
        this.data ="";
        this.user = user;
        this.userId = config.users[user];
        this.isOnline = false;

    }
    
    getUserId(){
        var urls = queryURL(this.user);
        var userId;
        
        this.query(urls.user, (err, data) => {
            data = JSON.parse(data);
            if(data.users){
                data.users.forEach((val, i) => {
                    this.userId = val._id;
                    console.log("val._id", val._id);
                });
            }
        });
    }
    
    checkOnline(){
        return new Promise(function (fulfill, reject){
        var urls = queryURL(this.userId);
            this.query(urls.stream, (err, data) => {
                try {
                    fulfill(JSON.parse(data));
                  } catch (ex) {
                    reject(ex, err);
                  }
            });
        });
    }
    
    getIsOnline() { return this.isOnline;}
    
    setIsOnline(value) {
        this.isOnline = value;
    }
    
    query(url, callback){
        const headers = { 
            'accept': 'application/vnd.twitchtv.v5+json', 
            'Client-ID': config.twitchId 
        };
        curl.request({ url: url, headers: headers },
        (err, data) => callback(err, data));
    }
    
    callback(err, data){
        console.log(data);
    }

    
}

