var $ = require('../bower_components/jquery/dist/jquery');
//var React = require('../bower_components/react/react');
//var JSXTransformer = require('../bower_components/react/JSXTransformer');

var AjaxRequestAPI = require('../js/utils/xhr-request-api');

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
    var ajax = new AjaxRequestAPI();
    var g = ajax.get(['http://localhost:3000']).then(success, reject);
    g.then(success, reject);
    g.then(success, reject);

    //for(var i = 0; i <100; i++) {
        ajax.post(['http://localhost:3000/about'],{params:'user=yrtytryrtyrt'}).then(success, reject);
    //}

    var put = { params:'{"put":"success"}'};
    var del = {"Content-Type": "application/json", params:'{"del":"success"}'};
    ajax.put(['http://localhost:3000/about'],put).then(success, reject);
    ajax.del(['http://localhost:3000/about'],del).then(success, reject);

    //$('body div').append('<h2>here i am</h2>');
    var t = require('../templates/y');
};

module.exports =  Main;

