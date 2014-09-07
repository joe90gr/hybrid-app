var xhrRequest = require('../../../../development/public/js/utils/xhr-request-api.js');

describe('xhrRequestAPI', function() {
    var xhr = new xhrRequest();
    var successSpy
    var rejectSpy

    var url = ['http://localhost:10346'];
    var asyncTrue = {async:true};
    var asyncFalse = {async:false};

    describe('given that the request url is valid', function() {
        describe('and i a asynchronous request', function() {
            before(function(done){
                successSpy = sinon.spy( function success(data){ done();} );
                rejectSpy = sinon.spy( function fail(data){ done(); } );
                xhr.get(url, asyncTrue).then(successSpy, rejectSpy);
            })

            it('should  resolve a fullfilled promise', function(){
                assert(successSpy.calledOnce);
                assert(rejectSpy.notCalled);
            })


        })

        describe('and is a synchronous request', function() {
            before(function(done){
                successSpy = sinon.spy( function success(data){ done();} );
                rejectSpy = sinon.spy( function fail(data){ done(); } );
                xhr.get(url, asyncFalse).then(successSpy, rejectSpy);
            })

            it('should  resolve a fullfilled promise', function(){
                assert(successSpy.calledOnce);
                assert(rejectSpy.notCalled);
            })
        })

        after(function(){
            successSpy.reset();
            rejectSpy.reset();
        });

    })



})