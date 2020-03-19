var lastSentence = [];
var idOfLastSentence = [];

function getStory() {
  $.ajax("/api/story", {
    type: "POST"
  });
}

function getEntry(text, author, storyId) {
  $.ajax("/api/entry", {
    type: "POST",
    data: { text: text.val(), author: author.val(), StoryId: storyId.data("id") }
  }).then(function () {
    location.reload();
  });
}

$(document).ready(function () {
  $("textarea#story").characterCounter();
  $("textarea#entry").characterCounter();
  $.get("/api/story/return", function (entryData) {
    entryData.forEach(function(val){
      if(lastSentence.length<10){
        if(val.Entries.length<3){
          var allText;
          var last = {};
          var storyId = {};
          var splitText;
          if(val.Entries.length>1){
            allText = val.Entries[val.Entries.length-1].text;
            splitText = allText.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
            if(splitText.length>1){
              last.text = splitText[splitText.length - 1];
            }else{
              last.text = splitText[0];
            }
            storyId.storyId = val.Entries[val.Entries.length-1].StoryId;
            lastSentence.push(last);
            idOfLastSentence.push(storyId);
          }else if(val.Entries.length === 1){
            allText= val.Entries[0].text;
            splitText = allText.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
            console.log(allText);
            console.log(splitText === null);
            if(splitText === null){
              last.text = allText;
              console.log("here");
            }else{
              console.log("or here");
              if(splitText.length>1){
                last.text = splitText[splitText.length - 1];
              }else{
                last.text = splitText[0];
              }
            }
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
$("#nextBtn").on("click", function (event) {
  event.preventDefault();
  console.log(lastSentence);
  if (counter < 10) {
    counter++;
    var displaySentence = lastSentence[counter].text;
    var displayId = idOfLastSentence[counter].storyId;
    $("#lastEntry").html(displaySentence);
    $("#lastEntry").attr("data-id", displayId);
  }
});

$("#createSubmit").on("click", function (event) {
  event.preventDefault();
  getStory();
  getEntry($("#story"), $("#storyAuthor"), $("#createSubmit"));
});

$("#continueSubmit").on("click", function (event) {
  event.preventDefault();
  getEntry($("#entry"), $("#entryAuthor"), $("#lastEntry"));
});


//Random words boxes
$("#wordRandomizer1").on("click", () => {
  $("#randomContainer1").removeClass("hide");
  $("#randomWordsList1").empty();
  $.get("/api/randomword").then(rWords => {
    rWords.forEach(function (word) {
      console.log("WORD:", word);
      $("#randomWordsList1").append($("<li>").text(word));
    });
  });

});
$("#wordRandomizer2").on("click", () => {
  $("#randomContainer2").removeClass("hide");
  $("#randomWordsList2").empty();
  $.get("/api/randomword").then(rWords => {
    rWords.forEach(function (word) {
      console.log("WORD:", word);
      $("#randomWordsList2").append($("<li>").text(word));
    });
  });
});

if ($("#createSubmit").data("id") === 0) {
  getStory();
  $.ajax("/api/entry", {
    type: "POST",
    data: {text: "I really hope this demo works. I would be heart broken if it did not.", author: "dummy", StoryId: 1}
  }).then(function() {
    console.log("here");
    location.reload();
  });
}