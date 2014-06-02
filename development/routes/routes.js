var app = require('../index');

var routes = require('./index');
var users = require('./users');
var about = require('./about');

app.use('/', routes);
app.use('/users', users);
app.use('/about', about);




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

