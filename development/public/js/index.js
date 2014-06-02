requirejs.config({
    "baseUrl":"js",
    "waitSeconds": 7,
    "useSourceUrl":false,
    "paths":{
        underscore: "../bower_components/underscore/underscore",
        jquery: "../bower_components/jquery/dist/jquery",
        backbone: "../bower_components/backbone/backbone",
        marionette: "../bower_components/backbone.marionette/backbone.marionette"
    },
    shim: {
        jquery : {
            exports : '$'
        },
        underscore: {
            exports: '_'
        },
        backbone:{
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette : {
            deps : ['backbone'],
            exports : 'Marionette'
        }
    }
});

require(['main'],function(myapp){
    var Console = new myapp();
});
