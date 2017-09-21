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
    constructor(user, id){
        this.data ="";
        this.user = user;
        this.userId = id;
        this.isOnline = false;

    }
    
    getUserId(){
        var urls = queryURL(this.user), query = this.query;
        var userId;
        return new Promise((fulfill, reject) => {
            query(urls.user, (err, data) => {
                try {
                    data = JSON.parse(data);
                    if(data.users){
                        data.users.forEach((val, i) => {
                            if(val._id){
                                fulfill(val._id);
                            }
                        });
                    }
                }catch (ex) {
                    reject(ex, err);
                }
            });
        });
    }
    
    checkOnline(){
        const uid = this.userId, query = this.query;
        return new Promise(function (fulfill, reject){
        var urls = queryURL(uid);
            query(urls.stream, (err, data) => {
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
    
    
}

/*var derp = new Twitch("officialandypyro");
derp.checkOnline().then((res) => {
    console.log("res", res);
})*/

module.exports = Twitch;