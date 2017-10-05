var cron = require('node-cron');
var Users = require('./Users');
var User = require ('../models/user');
var Twitch = require('./Twitch');

async function userList() {
    var users = [];
    await User.find({}, (err, docs) => {
        users = docs.map((val, i) => {
             Users.addUser(new Twitch(val.username, val.twitchKey));
        })
    });
    return Users;
}

async function startJobs() {
    await userList();
    
    const jobs = [
      cron.schedule('*/10 * * * *', function(){
        if(Users){
             Users.checkOnline();
        }
      }),
      
      cron.schedule('* * * * *', function(){
          if(Users){
              Users.saveData();
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
