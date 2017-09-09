const expect = require('chai').should();

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when value is not present', function () {
      [1, 2, 3].indexOf(8).should.equal(-1);
    });

    it('should return index of value if value is present', function (){
      [1, 2, 3].indexOf(2).should.equal(1);
    });
  });
});
