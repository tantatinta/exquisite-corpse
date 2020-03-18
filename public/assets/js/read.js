
// function renderStories(storyData) {
//   if(storyData.length !==0){
//     $("#add-to-me").empty();
//     $("#add-to-me").addClass("mainYellow");
//     storyData.forEach(function(val){
//       if(val.dataValues.Entries.length === 3){
//         var entriesArray = val.dataValues.Entries;
//         var storyString = "";
//         entriesArray.forEach(function(result){
//           storyString += (" " + result.dataValues.text);
//         });
//         $("#add-to-me").append("<p>" + storyString + "</p><hr>");
//     }
//   }) 

// }

// function renderStories(storyData) {
//   console.log(storyData);
//   if(storyData.length !==0){
//     $("#add-to-me").empty();
//     $("#add-to-me").addClass("mainYellow");
//   }

// }



$("#continueSubmit").on("click", function(event) {
  event.preventDefault();
  $.ajax("/api/entry/" + $("#entryAuthor").val(), {
    type: "GET",
  }).then(function(storyData) {
    // console.log(storyData);
    // console.log("search success");
    console.log(storyData);
    var storyIdArray = [];
    storyData.forEach(function(val){
      // console.log(storyIdArray.indexOf(val.dataValues.StoryId));
      if(storyIdArray.indexOf(val.dataValues.StoryId) === -1){
        console.log(val.dataValues.StoryId);
        // console.log(Entry.dataValues);
        storyIdArray.push(val.dataValues.StoryId);
      }
    });
    // console.log(storyIdArray);

    // renderStories(storyData);
  });
});

$("#continueSubmit").on("click", function(event) {
  event.preventDefault();
  $.get("/api/entry/" + $("#entryAuthor").val().trim(), function(storyData){
    console.log(storyData);

  });


});
