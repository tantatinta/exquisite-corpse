$(document).ready(function () {
  $("textarea#story").characterCounter();
  $("textarea#entry").characterCounter();
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

$("#wordRandomizer").on("click", () => {
  $.get("/api/randomword").then(rWords => console.log(rWords));
});
//write code to handle the response from random words
