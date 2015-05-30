var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log(req.headers);
    if(req.session.isAuthenticated) {
        res.render('home', { title: 'Express home' });
    } else {
        res.render('home', { title: 'Express home logged out' });
    }
})

module.exports =  router;