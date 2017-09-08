var curl = require('curlrequest');
var config = require('../config');


class Twitch {
    constructor(){
        
    }
    
    query(){
        var headers = { 'accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': config.twitchId }
        console.log("requesting", headers);
        curl.request({ url: 'https://api.twitch.tv/kraken/streams/67802451', headers: headers }, (err, data) => this.callBack(err, data));
    }
    
    callBack(err, data){
        console.log(data);
    }
    
}
