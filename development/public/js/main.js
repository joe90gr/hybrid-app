var $ = require('../bower_components/jquery/dist/jquery');
//var React = require('../bower_components/react/react');
//var JSXTransformer = require('../bower_components/react/JSXTransformer');
var React = require('react');
var ajax = require('../js/utils/xhr-request-api');

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

Main.prototype.init = function(){
    //ajax.get(['/'],{'Access-Token':'dfgdfgdf'}).then(success, reject);

    //for(var i = 0; i <100; i++) {
        //ajax.post(['/about'],{params:'user=yrtytryrtyrt'}).then(success, reject);
    //}

    var put = { params:'{"put":"success"}'};
    var del = {"Content-Type": "application/json", params:'{"del":"success"}'};
    //ajax.put(['/about'],put).then(success, reject);
    //ajax.del(['/about'],del).then(success, reject);

    //$('body div').append('<h2>here i am</h2>');
   // var t = require('../templates/y');
    var t = require('../react-views/jsx/y.jsx');
    var test = require('../react-views/test');
    //React.renderComponent(t(null), document.getElementById('example'));

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

