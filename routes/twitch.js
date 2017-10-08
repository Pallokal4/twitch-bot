var router = require('express').Router();
var Twitch = require ('../models/twitch');
var moment = require('moment');


router.get('/chat/:user/:time', (req, res) => {
    Twitch.find({type: "message", user: req.params.user }, function (err, docs) {
        res.json(docs);
    });
})

router.get('/joinpart/:user', (req, res) => {
    Twitch.find({type: "joinpart", user: req.params.user }, function (err, docs) {
        res.json(docs);
    });
})

router.get(['/api/:user/:time', '/api/:user'], (req, res) => {
    var params = {type: "api", user: req.params.user };
    if(req.params.time){
        switch(req.params.time){
            case "month":
                params["created"] = {"$gt": moment().subtract(1, 'M').format()}
                break;
            case "week":
                params["created"] = {"$gt": moment().subtract(1, 'w').format()}
                break;
        }
    }
    Twitch.find(params, function (err, docs) {
        res.json(docs);
    });
})

module.exports = router;