var app = require('../index');
var express = require('express');
var router = express.Router();

var routerConfig = require('../config/routes-config').routes;

for(var key in routerConfig){
    app.use(key, require('./' + routerConfig[key]));
}

//app.route('/about')
//    .all(function(req, res, next) {
//        //res.json({"get":"yyyyy"});
//        next();
//    })
//    .get(function(req, res, next) {
//        res.json({"get":"ffffggg"});
//    })
//    .post(function(req, res, next) {
//        res.json({"post":req.body.user});
//    })

