var $ = require('../bower_components/jquery/dist/jquery');
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
    ajax.get(['http://localhost:3000'],{async:true}).then(success, reject);
    //for(var i = 0; i <100; i++) {
        ajax.post(['http://localhost:3000/about'],{params:'user=yrtytryrtyrt'}).then(success, reject);
    //}

    var put = { params:'{"put":"success"}'}
    var deletee = {"Content-Type": "application/json", params:'{"put":"success"}'}
    ajax.put(['http://localhost:3000/about'],put).then(success, reject);
    ajax.delete(['http://localhost:3000/about'],deletee).then(success, reject);
    $('body div').append('<h2>here i am</h2>');
};

module.exports =  Main;

