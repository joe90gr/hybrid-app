var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.session.isAuthenticated) {
        var y = req.session.user.userName;
        req.session.destroy(function(err) {
            res.send('cant remove public session '+err, 500);
        });
        res.clearCookie('connect.sid', { path: '/' })

        res.json({"logged out ":y});
    }

    res.json({"Already not in session ":""})
})

module.exports =  router;


