var Promise = require('../../../../development/public/main-client-app/js/utils/promise.js');

describe('given the promise is initialised', function() {
    var promise;
    var successResponse;
    var failResponse
    var successSpy
    var rejectSpy

    describe('and the promise is resolved', function() {
        beforeEach(function(){
            promise = new Promise();
            successResponse = sinon.stub();
            failResponse = sinon.stub();

            successSpy = sinon.spy(function success(response){
                return successResponse.returns(response);
            });
            rejectSpy = sinon.spy(function fail(response){
                return failResponse.returns(response);
            });

            promise.resolve();
            returnedPromise = promise.then(successSpy,rejectSpy);
        });

        it('should call the success callback on fulfilling the promise', function(){
            assert(successSpy.calledOnce);
        })

        it('should NOT call the fail callback on fulfilling the promise', function(){
            assert(rejectSpy.notCalled);
        })

        it('should return its promise object', function(){
            expect(returnedPromise).to.be.equal(promise);
            expect(returnedPromise).to.be.an('object');
        })
    })

    describe('and the promise is rejected', function() {
        beforeEach(function(){
            promise = new Promise();
            successResponse = sinon.stub();
            failResponse = sinon.stub();

            successSpy = sinon.spy(function success(response){
                return successResponse.returns(response);
            });
            rejectSpy = sinon.spy(function fail(response){
                return failResponse.returns(response);
            });

            promise.reject();
            returnedPromise = promise.then(successSpy,rejectSpy);
        });
        it('should call the fail callback on rejection of the promise', function(){
            assert(rejectSpy.calledOnce);
        })

        it('should NOT call the success callback on rejection of the promise', function(){
            assert(successSpy.notCalled);
        })

        it('should return its promise object', function(){
            expect(returnedPromise).to.be.equal(promise);
            expect(returnedPromise).to.be.an('object');
        })
    })

    describe('and promises are chained', function() {
        beforeEach(function(){
            promise = new Promise();
        });

        it('should return the total sum of values passed through the promise chain', function(){
            var result = 0;
            var two = 2;
            var three = 3;
            var five = 5;

            promise.resolve(two, null);

            var returnedPromise = promise.then(function(val) {
                result = val + three;
                return val + three;
            }, function(){});

            returnedPromise.then(function(val) {
                result = val + five;
                return val + five;
            }, function(){});

            expect(result).to.be.equal(two + three + five)
        })
    })

})