var config = require('public/client-config/config.js');
var $ = require('bower_components/jquery/dist/jquery');
var myapp = require('public/main-client-app/js/main');

var template = require('views/compiled-hogan');

console.log(config);
$(function(){
    var Console = new myapp();
    document.getElementById('hogan-example').innerHTML = template.about({ title: "Hulk" });
});

