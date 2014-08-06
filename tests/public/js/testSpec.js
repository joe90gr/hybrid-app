describe('test',function(){
    var main = require('../../../development/public/js/main.js');
    var m = new main();

    it('should test',function(){
        var spy = sinon.spy(m,'init')
        m.init();
        assert(spy.calledOnce);
    });

    it('should test this',function(){
        expect(true).to.be.true;
    });

})