var mongoose = require("mongoose");

// Define a schema, or blueprint, for 
// documents inside this collection
var drugSchema = mongoose.Schema({
	name: String,
	effect: String,
	dosage: Number
});

// Export the model so that other files
// can run commands in this collection
module.exports = mongoose.model("drug", drugSchema);