var supertest = require('supertest');

var app = require('../src/app');

describe('zipline', function(){
  var currentTime = function(){
    return Date.now() / 1000;
  };

  it("should do stuff", function(done){
    // supertest(app)
    //   .get('/?time=123')
    //   .expect(400, done);
  });
});
