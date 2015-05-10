var config = require('../../client-config/config');
var $ = require('../../../bower_components/jquery/dist/jquery');
var myapp = require('./main');

var template = require('../../../views/templates/about.hjs');

console.log(config);
$(function(){
    var Console = new myapp();
    document.getElementById('example').innerHTML = template.render({ title: "Hulk" });
});

