var mongoose = require("mongoose");

// What will a music document look like
var Music = mongoose.Schema({
	title: String,
	artist: String,
	numberOfCharactersInLyrics: Number,
	bandMembers: [{
		name: String,
		instrument: String
	}]
});

module.exports = mongoose.model("music", Music);