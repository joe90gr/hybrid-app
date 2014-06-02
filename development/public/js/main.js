define(['jquery'], function($){
    var Main = function(){
        this.init();
    };
    Main.prototype.init = function(){
        $('body div').append('<h2>here i am</h2>');
    };
    return Main;
});
