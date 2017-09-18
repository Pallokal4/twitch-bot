var router = require('express').Router();
var userdb = require ('../models/user');

router.post('/add', (req, res) => {
    res.json({
        user: "derp",
        message: "success"
    })
})

router.get('/getUsers', (req, res) => {
    twitchdb.find({}, function (err, docs) {
        res.json(docs);
    });
})

module.exports = router;