var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
module.exports = app;

// view engine setup
app.set('views', path.join(__dirname, 'views/templates'));
app.set('view engine', 'hjs');
app.set('layout','base');
app.enable('view cache');
app.engine('hjs',require('hogan-express'));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({cookie: { path: '/', httpsOnly: true, maxAge: null, secure: true}, secret:'1234567890QWERTY'}));

require('./routes/routes');
require('./routes/error');

