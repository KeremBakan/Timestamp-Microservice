// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function (req, res) {
    res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    })
})


app.get("/api/:date?", function (req, res) {
  let date = req.params.date 
  let regexPattern = /^\d{4}-\d{2}-\d{2}$/

   if(date.match('^[0-9]*$')){
    date = parseInt(date)
      res.json({
        unix: date,
        utc: new Date(date).toUTCString()
      })
   } else if(regexPattern.test(date)){
      res.json({
        unix: new Date(date).getTime(),
        utc: new Date(date).toUTCString()
      })
   } else {
      res.json({
        error: 'Invalid Date'
      })
   }

});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
