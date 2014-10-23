// THIS IS CLIENT SIDE ONLY

$(function() {

	// Event handler for all clicks on update-numbers button
	$("#update-numbers").on("click", function(e) {

		// make an ajax GET request to the server
		$.get("/getNumber", {}, function(resultData){
			// recieved data from the server here
			console.log(resultData);

			// now append the number to UL
			// we res.send()'d an object from the 
			// server so our resultData is that same object
			$("#numbers").append("<li>" + resultData.number + "</li>");
		})
	});

	$("#update-numbers-five").on("click", function(e){

		$.get("/getNumber", {count: 5}, function(resultData){
			for (var i = 0; i < resultData.length; i++) {
				$("#numbers"). append("<li>" + resultData[i].number + "</li>")
			};
		})
	})

	$("#update-numbers-custom").on("click", function(e){
		var customCount = $("#custom-count").val();

		$.get("/getNumber", {count: customCount}, function(resultData){
			for (var i = 0; i < resultData.length; i++) {
				$("#numbers"). append("<li>" + resultData[i].number + "</li>")
			};
		})
	})

	// Polling - this will make a new request
	// 			  every x amount of time
	setInterval(function(){
		$.get("/getNumber", {}, function(resultData){
			$("#numbers").append("<li>" + resultData.number + "</li>");
		});
	}, 1000);

})