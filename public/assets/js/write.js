const randomWords = require("random-words");

$(document).ready(function() {
  $("textarea#story").characterCounter();
  $("textarea#entry").characterCounter();
});

$("#submit").on("click", function(event) {
  event.preventDefault();
  $.ajax("/api/entry", {
    type: "POST",
    data: {text: $("#entry").val(), author: $("#author").val()}
  }).then(function(res) {
    console.log(res);
  });
});

console.log(randomWords({exactly:5, wordsPerString:2}));
