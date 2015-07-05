var Events = require('public/main-client-app/js/utils/events');
var React = require('react');
var ajax = require('public/main-client-app/js/utils/xhr-request-api');
var template = require('views/compiled-hogan');

var reactClass = require('views/compiled-react.js');

function success(res){
    console.log(res.response);
   //console.log(res.getAllResponseHeaders())
}

function reject(error){
    console.log(error);
}

var Main = function(){
    this.init();
};

Main.prototype.init = function() {
    //ajax.get(['/'],{'Access-Token':'dfgdfgdf'}).then(success, reject);

    //for(var i = 0; i <100; i++) {
        //ajax.post(['/about'],{params:'user=yrtytryrtyrt'}).then(success, reject);
    //}
    var events = new Events();

    events.on('joetest', function(args) {
        console.log('handler response: ', args);
    });

    events.trigger('joetest', 'joe is the best');


    var put = { params:'{"put":"success"}'};
    var del = {"Content-Type": "application/json", params:'{"del":"success"}'};
    ajax.put(['/about'],put).then(success, reject);
    ajax.del(['/about'],del).then(success, reject);
    document.addEventListener('DOMContentLoaded', this.applicationStart, false);
};

Main.prototype.applicationStart = function() {
    React.render(React.createElement(reactClass.todoApp, null), document.getElementById('example'));
    var comp = React.render(React.createElement(reactClass.timer, null), document.getElementById('timer'));
    document.getElementById('hogan-example').innerHTML = template.about({ title: "Hulk" });

    var clickon = document.getElementById('clickon');
    clickon.addEventListener('click',function() {
        comp.componentDidMount();
    },false);
    var clickoff = document.getElementById('clickoff');
    clickoff.addEventListener('click',function() {
        comp.componentWillUnmount();
    },false);

    var login = document.getElementById('login');
    login.addEventListener('click',function() {
        var config = {
            "Content-Type": "application/json",
            params:'{"userName":"joe90"}'
        };
        ajax.post(['/login'], config).then(function(res){
            console.log(res.response);
        }, function(err) {});
    },false);

    var logout = document.getElementById('logout');
    logout.addEventListener('click',function() {
        ajax.get(['/logout']).then(function(res){
            console.log(res.response);
        }, function(err) {});
    },false);
};

module.exports =  Main;

