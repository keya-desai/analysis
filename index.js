var express = require("express");
var bodyParser = require("body-parser");
var app = express();
let csvToJson = require('convert-csv-to-json');
var jsonQuery = require('json-query');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  let fileInputName = 'input.csv'; 
  let json = csvToJson.getJsonFromCsv(fileInputName);
  const data = {
    json
  }
  console.log(jsonQuery('json[country=Afghanistan].num_attacks', {
    data: data
  }).value)
  res.send(jsonQuery('json[country=Afghanistan].num_attacks', {
    data: data
  }).value)
  // res.sendfile("index.html");
});

// app.get('/api/users', function(req, res) {
//   var user_id = req.param('id');
//   var token = req.param('token');
//   var geo = req.param('geo');  

//   res.send(user_id + ' ' + token + ' ' + geo);
// });

app.post('/api/users', function(req, res) {
  var user_id = req.body.id;
  var token = req.body.token;
  var geo = req.body.geo;

  res.send(user_id + ' ' + token + ' ' + geo);
});

app.post('/login', function (req, res) {
  const country = req.body.country
  let fileInputName = 'input.csv'; 
  let json = csvToJson.getJsonFromCsv(fileInputName);
  const data = {
    json
  }
  console.log(jsonQuery(`json[country=${country}].num_attacks`, {
    data: data
  }).value)
  res.send(jsonQuery(`json[country=${country}]`, {
    data: data
  }).value)
});
app.listen(3000, function () {
  console.log("Started on PORT 3000");
})