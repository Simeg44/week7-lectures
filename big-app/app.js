var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var indexController = require('./controllers/index.js');
var apiController = require("./controllers/apiController.js");

// Connect to our database
mongoose.connect("mongodb://localhost/bigApp");

// Seed the database
// 	Since I don't need to save access
// 	to each seed (as in they just execute),
// 	then I dont need to store them in
// 	a variable
require("./models/seeds/musicSeed.js");

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Main Views - static routes
app.get('/', indexController.index);
app.get("/view/:id", indexController.viewMusic);

// API Routes - ajax routes
app.get("/api/getMusic", apiController.getMusic);
app.get("/api/getSingle/:id", apiController.getSingle);
app.post("/api/addMusic", apiController.addMusic);
app.post("/api/delete", apiController.deleteMusic);

var server = app.listen(4834, function() {
	console.log('Express server listening on port ' + server.address().port);
});
