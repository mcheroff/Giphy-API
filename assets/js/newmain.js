$(document).ready(function(){


var buttonHTML = "";
var buttonArray = ["Bob's Burgers", "Daredevil", "Scandal", "The+Daily+Show", "Scream+Queens", "Luke+Cage"];
var newTvShowItem;
var gifArray = [];


function createButtons(){
	for (var i = 0; i < buttonArray.length; i++){
		buttonHTML += "<a class='waves-effect waves-light btn tvShowButtons' tvShowName=" + buttonArray[i] + ">" + buttonArray[i] + "</a>";
	}
	$("#buttonsDiv").html(buttonHTML);
}


createButtons();


$("body").on("click", "#submitUserData", function(event){
	event.preventDefault();
	newTvShowItem = $("#userInput").val();
	var newTvShowButton = "<a class='waves-effect waves-light btn tvShowButtons' tvShowName=" + newTvShowItem + ">" + newTvShowItem + "</a>"
	$("buttonsDiv").append(newTvShowButton);
});

$("body").on("click", ".tvShowButtons", function(event){
	$("#gifsDisplay").empty();
	var chosenTvShowItem = $(this).attr("tvShowName");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosenTvShowItem + "&limit=10" + "&api_key=dc6zaTOxFJmzC";
	$.ajax({url: queryURL, method: "GET"})
		.done(function(response){
			for (var i = 0; i < response.data.length; i++){
				$("#gifsDisplay").append("<div class='GIFbox'><p class='title'>Rating: "+ response.data[i].rating.toUpperCase() +"</p><div class='image-container'><img class='tvShowIMG img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>")
			}
		})
});

$('body').on('click', '.tvShowIMG', function(){
     var state = $(this).attr('data-state');
     var GIFnotMoving = $(this).attr('data-still');
     var GIFmoving = $(this).attr('data-animate');
     if (state === 'still') {
          $(this).attr('src', GIFmoving);
          $(this).attr('data-state', 'animate');
     }
     else if (state !== "still") {
          $(this).attr('src', GIFnotMoving);
          $(this).attr('data-state', 'still');
     };
});



});