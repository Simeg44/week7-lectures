var mongoose = require("mongoose");

// Connect to the database
mongoose.connect("mongodb://localhost/mongoose-basic");

// Creates a mongoose model of a Car with
// the given schema of data
var Car = mongoose.model("Car", {
	make: String,
	model: String,
	year: Number,
	passengers: [String]
});

/*// Create a new Car and fills in the data
var delorean = new Car({
	make: "Delorean",
	model: "Time Travelling One",
	year: 1985,
	passengers: ["Marty McFly", "Doc Brown", "Einstein the Dog"]
});

// Save the car to the database  
delorean.save();*/

// Find from the database. It will
// call our anonymous function and 
// pass it any errors and any documents 
// found based on the criteria we pass
Car.find({}, function(err, docs){

	// query has completed when this funciton is 
	// executed by mongoose

	console.log("err:", err);
	console.log("docs:", docs);

	// Print out an array of all the car makes
	var makes = docs.map(function(car) {
		return car.make;
	});
	console.log("makes:", makes);
});

