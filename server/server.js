/**
 * Created by Eran_Amar on 9/17/14.
 */
var express = require('express');
var lineReader = require('line-reader');
var fs = require('fs');

var app = express();
var filename = './data.txt';

function readAll(finishCb) {
  var postObjects = [];
  lineReader.eachLine(filename, function (line) {
    var parseObj = JSON.parse(line);
    postObjects.push({
      id: parseObj.id,
      post: parseObj.post
    });
  }).then(function () {
    finishCb(postObjects);
  });
}

function allowOrigin(res) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
}

app.get('/posts', function (req, res) {
  function sendPosts(postObjects) {
    allowOrigin(res);
    res.json({posts: postObjects});
  }

  readAll(sendPosts);
});

app.get('/check', function (req, res) {
  res.send('Welcome. I am running.');
});

app.get('/updatePost', function (req, res) {
  function updatePost(postObjects) {
    var updatedPost = req.param('post'), updatedId = req.param('id');
    postObjects.forEach(function (item) {
      if (item.id == updatedId) {
        item.post = updatedPost;
      }

    });
    var postsStr = postObjects.map(JSON.stringify).join('\n');
    fs.writeFileSync(filename, postsStr);
    console.log('done saving. id=', updatedId);
    res.status(200).end();
  }

  allowOrigin(res);
  readAll(updatePost);
});


console.log('running on 3000');
app.listen(3000);
