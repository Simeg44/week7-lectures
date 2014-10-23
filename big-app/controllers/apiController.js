var Music = require("../models/music.js");

var apiController = {
	getMusic: function (req, res) {
		// 1. Find all music items
		Music.find({}, function (err, results) {
			// 2. Send back the results
			res.send(results);
		})
	},
	
	getSingle: function (req, res) {
		var id = req.params.id;
		Music.findOne({_id: id}, function (err, result) {
			res.send(result);
		});
	},

	addMusic: function (req, res) {
		// This came from the $.post on the client-side
		var trackData = req.body;
		console.log("trackData:", trackData);

		var newMusic = new Music(trackData);
		console.log("newMusic:", newMusic);

		newMusic.save(function(err, result){
			console.log("music saved:", result);
			res.send(result);
		});
	},
	// Allow the user to delete music items
	// Should send back a success = true
	// if the delete was successful
	deleteMusic: function(req, res) {
		var id = req.body.id;

		// Attempt to delete the requested item
		Music.remove({_id: id}, function(err, result){
			res.send({
				err: err,
				result: result,
				success: err === null
			});
		});
	}
};

module.exports = apiController;