var router = require('express').Router();

router.post('/add', (req, res) => {
    res.json({
        user: "derp",
        message: "success"
    })
})

module.exports = router;