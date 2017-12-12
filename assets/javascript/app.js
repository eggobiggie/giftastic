
//List of Starter TV shows
var topics = ["Rocko's Modern Life", "Daria", "Avatar The Last Airbender", "Steven Universe", "Bob's Burgers", "The Amazing World of Gumball", "Powerpuff Girls",
 "Over The Garden Wall", "Inspector Gadget", "Rugrats", "Regular Show"];
 
 
//Click function to show gifs
function displayCartoonGifs() {

    $("button").on("click", function() {

        $("#gifs-here").empty();

        var cartoonShow = $(this).attr("data-name");        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=L19YkANp6EYJCHYMipXxsNPkUl4PLLKX&q=" + cartoonShow + "&limit=10&offset=0&rating=G&lang=en";
              

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
            cartoonImage.attr("src", results[i].images.fixed_height.url);

            cartoonImage.addClass("img-responsive");
            
            gifDiv.prepend(paragraph);
            gifDiv.prepend(cartoonImage);
            
            $("#gifs-here").prepend(gifDiv);

            }
            
        });

    });
}

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

    //Button click for new cartoon add
    $("#cartoon-add").on("click", function(event) {

        event.preventDefault();

        var cartoonAdd = $("#cartoon-input").val().trim();

        topics.push(cartoonAdd);

        renderButtons();

    });


    $(document).on("click", ".cartoon", displayCartoonGifs);

    renderButtons();


    //Code for still/animate states of the gif
    // $(".cartoon").on("click", function() {

    //     let state = $(this).attr("data-state");
    //     if (state === "still") {
    //         let newSrc = $(this).attr("data-animate");
    //         $(this).attr("src", newSrc);
    //         $(this).attr("data-state", "animate");
    //       } else {
    //         let newSrc = $(this).attr("data-still");
    //         $(this).attr("src", newSrc);
    //         $(this).attr("data-state", "still");
    //       }

    // });

