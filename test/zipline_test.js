var connect = require('connect');
var supertest = require('supertest');

var easymac = require('../easymac');

describe('easymac', function(){
  var testApp = function(){
    var app = connect();
    app.use(connect.query());
    app.use(easymac('secure', 10));
    app.use(function(req, res){
      res.end('success');
    });

    return supertest(app);
  };

  var currentTime = function(){
    return Date.now() / 1000;
  };

  it("should give a 400 if the auth_hash is missing", function(done){
    testApp()
      .get('/?time=123')
      .expect(400, done);
  });

  it("should give a 400 if the time is missing", function(done){
    testApp()
      .get('/?auth_hash=123')
      .expect(400, done);
  });

  it("should give a 403 if the auth_hash is incorrect", function(done){
    testApp()
      .get('/?auth_hash=123&time=456')
      .expect(403, done);
  });
});
