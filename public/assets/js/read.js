
function renderStories(storyData) {
  if(storyData.length !==0){
    $("#add-to-me").html("");
    $("#add-to-me").addClass("mainYellow");
    storyData.forEach(function(val){
      if (val.Entries.length === 3){
        var storyString = "";
        val.Entries.forEach(function(results){
          storyString += ("  " + results.text);
        });
        $("#add-to-me").append("<p>" + storyString + "</p><hr>");
      }
    });
  }
}

$("#continueSubmit").on("click", function(event) {
  event.preventDefault();
  $.get("/api/entry/" + $("#entryAuthor").val().trim(), function(storyData){
    var storyIdArray = [];
    storyData.forEach(function(val){
      if(storyIdArray.indexOf(val.StoryId) === -1){
        storyIdArray.push(val.StoryId);
      }
    });
    $.get("/api/story/return", function(results){
      var storyData = [];
      results.forEach(function(value){
        storyIdArray.forEach(function(i){
          if(value.id === i){
            storyData.push(value);
          }
        });
      });
      renderStories(storyData);
    });
  });
});