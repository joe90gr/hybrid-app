var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('about', { title: req.query.user });
    //res.json({"post":req.query.user});
});

router.post('/', function(req, res) {
    res.render('about', { title: req.body.user });
    //res.json({"post":req.body.user});
});

module.exports = router;
