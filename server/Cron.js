var cron = require('node-cron');
var Users = require('./Users');
var User = require ('../models/user');
var Twitch = require('./Twitch');

const userList = () => {
    return new Promise((fulfill, reject) => {
        User.find({}, (err, docs) => {
         fulfill(docs.map((val, i) => {
             return new Twitch(val.username, val.twitchKey);
         }));
        });
    });
}

async function getUsers(){
    var users = [];
    await userList().then((res) => {
        derp = new Users(res);
    });
    return users;
}

var streams = getUsers();


const jobs = [
      cron.schedule('*/10 * * * *', function(){
          streams.checkOnline();
        console.log("update onlinestatus");
      }),
      
      cron.schedule('* * * * *', function(){
          streams.saveData();
        console.log('get data of online users');
      })
];

jobs.forEach((val, i) => {
            val.start();
        });

module.exports = {
    start: () => {
        jobs.forEach((val, i) => {
            val.start();
        });
    },
    stop: () => {
        jobs.forEach((val, i) => {
            val.stop();
        });
    }
};
