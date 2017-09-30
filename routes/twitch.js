var router = require('express').Router();
var Twitch = require ('../models/twitch');


router.get('/chat/:user', (req, res) => {
    Twitch.find({type: "message", user: req.params.user }, function (err, docs) {
        res.json(docs);
    });
})

router.get('/joinpart:/user', (req, res) => {
    Twitch.find({type: "joinpart", user: req.params.user }, function (err, docs) {
        res.json(docs);
    });
})

router.get('/api/:user', (req, res) => {
    Twitch.find({type: "api", user: req.params.user }, function (err, docs) {
        res.json(docs);
    });
})

module.exports = router;