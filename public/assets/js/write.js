var lastSentence = [];
var idOfLastSentence = [];

$(document).ready(function () {
  $("textarea#story").characterCounter();
  $("textarea#entry").characterCounter();
  $.get("/api/story/return", function(entryData){
    entryData.forEach(function(val){
      if(lastSentence.length<10){
        if(val.Entries.length<3){
          var allText;
          var last = {};
          var storyId = {};
          if(val.Entries.length>1){
            allText = val.Entries[val.Entries.length-1].text;
            var splitText = allText.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
            if(splitText.length>1){
              last.text = splitText[splitText.length - 1];
            }else{
              last.text = splitText[0];
            }
            storyId.storyId = val.Entries[val.Entries.length-1].StoryId;
            lastSentence.push(last);
            idOfLastSentence.push(storyId);
          }else if(val.Entries.length === 1){
            last.text = val.Entries[0].text;
            storyId.storyId = val.Entries[0].StoryId;
            lastSentence.push(last);
            idOfLastSentence.push(storyId);
          }
        }
      }
    });
  });
});

var counter = 0;
$("#nextBtn").on("click", function(event){
  event.preventDefault();
  if(counter<10){
    counter++;
    var displaySentence = lastSentence[counter].text;
    var displayId = idOfLastSentence[counter].storyId;
    $("#lastEntry").html(displaySentence);
    $("#lastEntry").attr("data-id", displayId);
  }
});

$("#createSubmit").on("click", function (event) {
  event.preventDefault();
  $.ajax("/api/story", {
    type: "POST"
  }).then(function (res) {
    console.log(res);
  });
  $.ajax("/api/entry", {
    type: "POST",
    data: {text: $("#story").val(), author: $("#storyAuthor").val(), StoryId: $("#createSubmit").data("id")}
  }).then(function(res) {
    console.log(res);
    location.reload();
  });
});

$("#continueSubmit").on("click", function (event) {
  event.preventDefault();
  $.ajax("/api/entry", {
    type: "POST",
    data: { text: $("#entry").val(), author: $("#entryAuthor").val(), StoryId: $("#lastEntry").data("id") }
  }).then(function (res) {
    console.log(res);
    location.reload();
  });
});

//grabbing button click by ID. change to class if this is not an issue to make the random words appear in the correct place
$("#wordRandomizer1").on("click", () => {
  $.get("/api/randomword").then(rWords => console.log(rWords));
});
$("#wordRandomizer2").on("click", () => {
  $.get("/api/randomword").then(rWords => console.log(rWords));
});
//write code to handle the response from random words


if ($("#createSubmit").data("id") === 0) {
  $.ajax("/api/story", {
    type: "POST"
  });
  $.ajax("/api/entry", {
    type: "POST",
    data: {text: "dummy text", author: "dummy", StoryId: 1}
  }).then(function() {
    console.log("here");
    location.reload();
  });
}