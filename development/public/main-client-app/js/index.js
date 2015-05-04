var config = require('../../client-config/config');
var $ = require('../../../bower_components/jquery/dist/jquery');
var myapp = require('./main');

console.log(config);
$(function(){
    var Console = new myapp();
});

