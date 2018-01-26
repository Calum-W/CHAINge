define(function (require){
  var index = require('../index'):

  Qunit.module("blockchain-practise/index")

  QUnit.test( "voteForCandidate - will return null if invaild candidate", function() {
    assert.equal(index.voteForCandidate("Charles"), null );
  });

  // Qunit.test("")
}
