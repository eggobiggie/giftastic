//List of Starter TV shows
var topics = ["Rocko's Modern Life", "Daria", "Avatar The Last Airbender", "Steven Universe", "Bob's Burgers", "The Amazing World of Gumball", "Powerpuff Girls",
 "Over The Garden Wall", "Inspector Gadget", "Rugrats", "Regular Show"];

//Function to render buttons of array of topics  
function renderButtons() {
    
        $("#buttons").empty();
    
        for (var i = 0; i < topics.length; i++) {
    
            var newButton = $("<button></button>");
        
            newButton.addClass("cartoon");
    
            newButton.attr("data-name", topics[i]);
    
            newButton.text(topics[i]);
    
            $("#buttons").append(newButton);
    
        }
    }

renderButtons();
 
//Function to show gifs
function displayCartoonGifs() {

    $("#gifs-here").empty();

    var cartoonShow = $(this).attr("data-name");        
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + GiphyKey + "&q=" + cartoonShow + "&limit=10&offset=0&rating=G&lang=en";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
            
        var results = response.data;
            
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item col-lg-4 col-md-4 col-sm-4'>");
            
            var rating = results[i].rating;
            
            var paragraph = $("<p>").text("Rating: " + rating);
            
            var cartoonImage = $("<img>");

            cartoonImage.attr("src", results[i].images.fixed_height_still.url); 
            cartoonImage.attr("data-still", results[i].images.fixed_height_still.url);
            cartoonImage.attr("data-animate", results[i].images.fixed_height.url);
            cartoonImage.attr("data-state", "still");
            cartoonImage.addClass("img-responsive cartoonGif");

            gifDiv.prepend(paragraph);
            gifDiv.prepend(cartoonImage);
            
            $("#gifs-here").prepend(gifDiv);

             //Still images vs animating gifs
             $(cartoonImage).on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    var newSrc = $(this).attr("data-animate");
                    $(this).attr("src", newSrc);
                    $(this).attr("data-state", "animate");
                } else {
                    var newSrc = $(this).attr("data-still");
                    $(this).attr("src", newSrc);
                    $(this).attr("data-state", "still");
                }
             });

        }
            
    });
}

//Click function to run display cartoon gifs
$(".cartoon").on("click", function() {

    displayCartoonGifs();
    
});

//Button click for new cartoon add
$("#cartoon-add").on("click", function(event) {
        
    event.preventDefault();       
    var cartoonAdd = $("#cartoon-input").val().trim();     
    topics.push(cartoonAdd);     
    renderButtons();
        
});

$(document).on("click", ".cartoon", displayCartoonGifs);

renderButtons();