var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log(req.headers);
    if(req.session.isAuthenticated){
        res.render('home', { title: 'Express home' });
    }
    else {
        res.render('home', { title: 'Express home logged out' });
    }
});

router.post('/login', function(req, res) {
    console.log(req.body.userName,'hgjghgj')
    req.session.isAuthenticated = true;
    req.session.user = {
        userName: req.body.userName
    };
    if(req.session.isAuthenticated){
        res.json({"logged in ":true});
    }
    else {
        res.json({"logged in ":false});
    }
});

router.get('/logout', function(req, res) {
    console.log(req.session.isAuthenticated,'fhghfhgf')
    if(req.session.isAuthenticated){
        var y = req.session.user.userName;
        req.session.destroy(function(err) {
            res.send('cant remove public session '+err, 500);
        });
        res.clearCookie('connect.sid', { path: '/' })

        res.json({"logged out ":y});
    }
    res.json({"Already not in session ":""})
});

module.exports = router;
