$(document).ready(function(){

    var actors = ["arnold schwarzenegger","michael j fox","clark gable"];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
          }
      
        }
      
        $(document).on("click", ".actor-button", function() {
          $("#actors").empty();
          $(".actor-button").removeClass("active");
          $(this).addClass("active");
      
          var type = $(this).attr("data-type");
          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
      
          $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              var results = response.data;
              console.log(results)
      
              for (var i = 0; i < results.length; i++) {
                var actorDiv = $("<div class=\"actor-item\">");
      
                var rating = results[i].rating;
      
                var p = $("<p>").text("Rating: " + rating);
      
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
      
                var actorImage = $("<img>");
                actorImage.attr("src", still);
                actorImage.attr("data-still", still);
                actorImage.attr("data-animate", animated);
                actorImage.attr("data-state", "still");
                actorImage.addClass("actor-image");
      
                actorDiv.append(p);
                actorDiv.append(actorImage);
      
                $("#actors").append(actorDiv);
              }
            });
        });
      
        $(document).on("click", ".actor-image", function() {
      
          var state = $(this).attr("data-state");
      
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      
        $("#add-actor").on("click", function(event) {
          event.preventDefault();
          var newactor = $("input").eq(0).val();
      
          if (newactor.length > 2) {
            actors.push(newactor);
          }
      
          populateButtons(actors, "actor-button", "#actor-buttons");
      
        });
      
        populateButtons(actors, "actor-button", "#actor-buttons");
      });
      
    
/* $("button").on("click", function() {
  var person = $(this).attr("data-person");
  console.log(person)
  console.log($(this).attr("data-person"))
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});
}) */