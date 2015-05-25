var express = require('express');
var app = express();
var request = require('request');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
if (!process.env.API_KEY) {
  var config = require('./config');
}

// configuration =================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var options = {
  method: 'get',
  // url: 'https://pareshchouhan-trivia-v1.p.mashape.com/v1/quizQuestionsByCategory?categoryId=20&limit=50&page=1', (api doesn't support this endpoint anymore)
  url: 'https://pareshchouhan-trivia-v1.p.mashape.com/v1/getRandomQuestion',
  headers: {
    'X-Mashape-Authorization': process.env.API_KEY || config.API_KEY
  }
};

 // listen (start app with node server.js) ======================================
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server now listening on port ' + port);


// request to get list of questions, api doesn't support this anymore
app.get('/questions', function(req, res) {
  request(options, function(err, response, data) {
    if(err) {
      console.log('error:', err);
    } else {
      return res.send(data);
    }
  });
});

// request to get single random question
app.get('/question', function(req, res) {
  request(options, function(err, response, data) {
    if(err) {
      console.log('error:', err);
    } else {
      return res.send(data);
    }
  });
});
