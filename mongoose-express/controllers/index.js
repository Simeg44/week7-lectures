// Require our model
var Drug = require("../models/drugs.js")

var indexController = {
	index: function(req, res) {
		Drug.find({}, function(err, results){
			// Wait for the find() to complete
			// before calling render
			res.render('index', {
				drugs: results
			});
		})
	},

	smokeIt: function(req, res){
		var drugData = req.body;

		// Use the submitted data
		// to create a new Drug instance
		var drug = new Drug(drugData);

		// Once this save operation is completed...
		drug.save(function(err, result){
			
			// Send the newly saved document back to the browser
			/*res.send({
				err: err,
				result: result
			});*/

			// redirect back to the main listing page
			res.redirect("/");
		});
	}
};

module.exports = indexController;