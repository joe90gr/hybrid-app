var xhrRequest = require('../../../../development/public/js/utils/xhr-request-api.js');

describe('testuu', function() {
    var xhr = new xhrRequest();

    before(function(){

    })
    it('testyy', function(done){
        var s = sinon.spy(success);
        var r = sinon.spy(fail);
        function success(data){
            console.log(data,'success test');
            expect(true).to.be.true;
            done();
        }
        function fail(data){
            console.log(data,'fail test');
            expect(true).to.be.true;
            done();
        }

        xhr.get(['http://localhost:10346'],{async:true}).then(success, fail);

    });

})