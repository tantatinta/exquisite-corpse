
function renderStories(storyData) {
  // console.log(storyData);
  if(storyData.length !==0){
    $("#add-to-me").html("");
    $("#add-to-me").addClass("mainYellow");
    storyData.forEach(function(val){
      if (val.Entries.length === 3){
        var stroryString = "";
        val.Entries.forEach(function(results){
          stroryString += (" " + results.text);
        });
        $("#add-to-me").append("<p>" + stroryString + "</p><hr>");
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
    // console.log(storyIdArray);
    $.get("/api/story/return", function(results){
      // console.log(storyIdArray);
      // need to alter results to filter for each index of storyIdArray
      var storyData = [];
      results.forEach(function(value){
        // console.log(storyIdArray);
        storyIdArray.forEach(function(i){
          if(value.id === i){
            storyData.push(value);
          }
        });
      });
      // console.log(storyData);
      renderStories(storyData);
    });
  });
});
