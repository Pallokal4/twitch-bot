var cron = require('node-cron');


const jobs = [
      cron.schedule('*/10 * * * *', function(){
        console.log("update onlinestatus");
      }),
      
      cron.schedule('* * * * *', function(){
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