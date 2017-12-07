// server.js
// where your node app starts

// init project
var express = require('express'),
    moment = require('moment')
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:time', function (request, response) {
  let time, param = request.params.time
  if (isNaN(param)) {
    time = moment(param, "MMMM YYYY, DD")
  } else {
    time = moment.unix(param)
  }
  const json = {
    unix: time.isValid() ? time.unix() : null,
    natural: time.isValid() ? time.format('MMMM YYYY, DD') : null
  }
  response.json(json)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
