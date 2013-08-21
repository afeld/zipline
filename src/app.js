// https://github.com/ctalkington/node-archiver/blob/master/examples/pack-zip.js
// http://stackoverflow.com/a/17633505

var archiver = require('archiver');
var express = require('express');
var path = require('path');
var request = require('request');

var app = express();

app.get('/', function(req, res){
  res.on('end', function(){ console.log('res ended'); });

  var fileUrl = req.query.file;
  var download = request(fileUrl);
  download.on('end', function(){ console.log('download ended'); });
  res.writeHead(200, {
    'Content-type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename="yourarchive.zip"',
    // 'Content-Transfer-Encoding': 'binary'
  });

  var archive = archiver('zip');
  archive.on('end', function(){ console.log('archive ended'); });
  archive.pipe(res);
  var filename = path.basename(fileUrl);
  archive.append(download, { name: filename });

  archive.finalize(function(err, written){
    if (err) res.send(500);
    console.log('written: ' + written);
  });
});

module.exports = app;
