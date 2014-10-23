// This is client-side JS


// Render the given track data as the list item
var renderTrack = function (trackData) {
	var el = $("<li>");

	//  Set an attribute on the main containing
	//  li that will let us access the track's 
	//  specific database ID
	el.attr("data-id", trackData._id);

	// Append elements to the LI that iwll help
	// display the basics of a track
	el.append("<h4>" + trackData.title + "</h4>");
	el.append("<p><em>" + trackData.artist + "</em></p>");

	// Append some action items to this track
	el.append("<button class='btn btn-danger delete'>Delete</button>");
	el.append("<a class='btn btn-info' href='/view/" + trackData._id + "'>View</a>");
	// Add an edit button too
	el.append("<button class='btn btn-success edit'>Edit</button>");

	return el;
};

$(function(){

	// On Page Load:
	// 		Pull down the list of music
	// 		using AJAX and render it
	// 		to the page.
	$.get("/api/getMusic", {}, function(responseData){
		// We've got a dataset back from the server,
		// so let's build out the display in the DOM
		console.log("getMusic Response:", responseData);

		// Loop through the responseData array...
		for (var i = 0; i < responseData.length; i++) {

			// And render each track to the DOM
			var trackEl = renderTrack(responseData[i]);
			$("#music-list").append(trackEl);
		}
	});

	// Hijack the new-music form
	$("#new-music").on("submit", function(e){
		e.preventDefault();
		var trackTitle = $(this).find("[name=title]").val();
		var trackArtist = $(this).find("[name=artist]").val();
		var trackData = {
			title: trackTitle,
			artist: trackArtist
		};

		console.log(trackData);


		$.post("/api/addMusic", trackData, function(responseData){
			var trackEl = renderTrack(responseData);
			$("#music-list").append(trackEl);
		});

	});

	// Delegated event for our deletee buttons
	$(document).on("click", ".delete", function(){
		
		//  Cache this selector so that we can
		//  use it within the scope of our callback
		//  from the post to api/delete
		var container = $(this).closest("li");

		// Traverse to the parent LI element
		// and retrieve the data-id attribute value
		var musicId = container.attr("data-id");

		// Print out the data to the console
		console.log("delete:", musicId);

		$.post("/api/delete", {id: musicId}, function(responseData){
			console.log("responseData:", responseData);
			if(responseData.success === true){
				 // successful delete, so remove from DOM
				 container.remove();
			}
		})
	});

	// Delegated event for our edit button
	$(document).on("click", ".edit", function () {
		var container = $(this).closest("li");
		var modal = $("#edit-modal");
		var musicId = container.attr("data-id");

		var requestUrl = "/api/getSingle/" + musicId;

		$.get(requestUrl, {}, function(responseData){
			console.log(responseData);

			// Set the value of the inputs in our modal
			// to be the value of the response data's title
			modal.find("[name=title]").val(responseData.title);
			modal.find("[name=artist]").val(responseData.artist);
		
			// Finally, after all the data is retrieved and 
			// we've updated the values in the form,
			// let's show the modal
			modal.modal("show");
		});

	});

});