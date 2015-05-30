var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    console.log(req.body.userName,'hgjghgj')
    req.session.isAuthenticated = true;
    req.session.user = {
        userName: req.body.userName
    };
    if(req.session.isAuthenticated) {
        res.json({"logged in ":true});
    }
    else {
        res.json({"logged in ":false});
    }
})

module.exports =  router;