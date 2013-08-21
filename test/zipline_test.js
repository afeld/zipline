var express = require('express');
var http = require('http');
var supertest = require('supertest');

var app = require('../src/app');

describe('zipline', function(){
  var createServer = function(){
    var testApp = express();
    testApp.get('/test.js', function(req, res){
      res.sendfile(__filename);
    });
    return http.createServer(testApp);
  };

  var testServer = createServer();

  before(function(done){
    testServer.listen(8000, done);
  });
  after(function(){
    testServer.close();
  });


  var currentTime = function(){
    return Date.now() / 1000;
  };

  it("should respond with an octet-stream", function(done){
    supertest(app)
      .get('/?file=http://localhost:8000/test.js')
      .expect(200, done);
  });
});
