$(document).ready(function() {
  $("textarea#story").characterCounter();
  $("textarea#entry").characterCounter();
});

$("#createSubmit").on("click", function(event) {
  event.preventDefault();
  $.ajax("/api/story", {
    type: "POST"
  }).then(function(res) {
    console.log(res);
  });
  $.ajax("/api/entry", {
    type: "POST",
    /* StoryId is hardcoded right now, so it only works once currently */
    data: {text: $("#story").val(), author: $("#storyAuthor").val(), StoryId: 4}
  }).then(function(res) {
    console.log(res);
  });
});

$("#continueSubmit").on("click", function(event) {
  event.preventDefault();
  $.ajax("/api/entry", {
    type: "POST",
    data: {text: $("#entry").val(), author: $("#entryAuthor").val(), StoryId: $("#lastEntry").data("id")}
  }).then(function(res) {
    console.log(res);
    location.reload();
  });
});

$("#wordRandomizer").on("click", () => {
$.ajax("/write", {
  type: "GET"
})
  
});

