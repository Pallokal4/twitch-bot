var cron = require('node-cron');
var Users = require('./Users');

var derp = new Users();
const jobs = [
      cron.schedule('*/10 * * * *', function(){
          derp.checkOnline();
        console.log("update onlinestatus");
      }),
      
      cron.schedule('* * * * *', function(){
          derp.saveData();
        console.log('get data of online users');
      })
];

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