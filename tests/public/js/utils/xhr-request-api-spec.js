var xhrRequest = require('../../../../development/public/js/utils/xhr-request-api.js');

describe('xhrRequestAPI', function() {
    var xhr = xhrRequest;
    var successSpy
    var rejectSpy

    var ACTIVE_BASE_URL = ['http://localhost:10346'];
    var INACTIVE_BASE_URL = ['http://localhost:10350'];
    var ASYNCHRONOUS = {async:true};
    var SYNCHRONOUS = {async:false};

    describe('given that the request url is valid', function() {
        describe('and the request is asynchronous.', function() {
            before(function(done){
                successSpy = sinon.spy( function success(response){ done();} );
                rejectSpy = sinon.spy( function fail(response){ done(); } );
                xhr.get(ACTIVE_BASE_URL, ASYNCHRONOUS).then(successSpy, rejectSpy);
            })

            it('should provide a successful response and call the success callback', function(){
                assert(successSpy.calledOnce);
            })
        })

        describe('and the request is synchronous.', function() {
            before(function(done){
                successSpy = sinon.spy( function success(response){ done();} );
                rejectSpy = sinon.spy( function fail(response){ done(); } );
                xhr.get(ACTIVE_BASE_URL, SYNCHRONOUS).then(successSpy, rejectSpy);
            })

            it('should provide a successful response and call the success callback', function(){
                assert(successSpy.calledOnce);
            })
        })

        after(function(){
            successSpy.reset();
            rejectSpy.reset();
        });
    })

    describe('given that the request url is invalid', function() {
        before(function(done){
            this.timeout(6000);
            successSpy = sinon.spy( function success(response){ done();} );
            rejectSpy = sinon.spy( function fail(response){ done(); } );
            xhr.get(INACTIVE_BASE_URL, ASYNCHRONOUS).then(successSpy, rejectSpy);
        })

        it('should provide a error response by calling reject callback', function(){
            assert(rejectSpy.calledOnce);
        })
    })
})