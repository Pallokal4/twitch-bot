var cron = require('node-cron');
var Users = require('./Users');
var User = require ('../models/user');
var Twitch = require('./Twitch');

async function userList() {
    var users = [];
    await User.find({}, (err, docs) => {
        users = docs.map((val, i) => {
             return new Twitch(val.username, val.twitchKey);
        })
    });
    return new Users(users);
}

async function startJobs() {
    var streams = await userList();
    
    const jobs = [
      cron.schedule('*/10 * * * *', function(){
        console.log("update onlinestatus");
        if(streams){
             streams.checkOnline();
        }
      }),
      
      cron.schedule('* * * * *', function(){
          console.log('get data of online users', streams, streams.Users);
          if(streams){
              streams.saveData();
          }
      })
    ];
    
    jobs.forEach((val, i) => {
            val.start();
    });
}




module.exports = {
    start: () => startJobs()
};
