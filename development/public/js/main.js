var $ = require('../bower_components/jquery/dist/jquery');

var Main = function(){
    console.log('init');
    this.init();
};
Main.prototype.init = function(){
    console.log('init init');
    $('body div').append('<h2>here i am</h2>');
};

module.exports =  Main;

