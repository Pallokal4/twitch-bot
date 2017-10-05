var router = require('express').Router();
var User = require ('../models/user');
var Twitch = require('../server/Twitch');
var Irc = require('../server/Irc');
var Users = require('../server/Users');

router.post('/add', (req, res) => {
    var username = req.body.user.username;
    var usr = new Twitch(username, null);
    usr.getUserId().then((key) => {
            var user = new User({
            username: username,
            email: req.body.user.email,
            twitchKey:key
        });
        
        user.save().then((usr) => {
            Irc.bot.emit('adduser', username );
            Users.addUser(new Twitch(username, key));
            res.json({
                user: usr,
                message: 'success'
            });
        },
        (err) => {
            res.send(500, err.message);
        });
    })
    
})


router.get('/getUser/:user', (req, res) => {
    User.find({username: req.params.user}, function (err, docs) {
        res.json(docs);
    });
})

router.get('/getUsers', (req, res) => {
    User.find({}, function (err, docs) {
        res.json(docs);
    });
})

module.exports = router;