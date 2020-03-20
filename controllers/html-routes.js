var db = require("../models");
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/read", function(req, res) {
    db.Story.findAll({
      include: [db.Entry]
    })
      .then(function(storyData){
        var allStoryStrings = [];
        var allAuthors = [];
        storyData.forEach(function(val){
          if(allStoryStrings.length<10){
            if(val.dataValues.Entries.length === 3){
              var entriesArray = val.dataValues.Entries;
              var storyObject = { text: ""};
              var authorString = {author: ""};
              entriesArray.forEach(function(result){
                storyObject.text += (" " + result.dataValues.text);
                if(result.dataValues.author){
                  authorString.author += (" " + result.dataValues.author);
                }
              });
              allStoryStrings.push(storyObject);
              // console.log(authorString);
              // console.log(authorString.author.split(" "));
              var split = authorString.author.split(" ");
              var editedString = {author: ""};
              if(split.length === 4){
                editedString.author = split[1] + ", " + split[2] + ", and " + split[3];
                allAuthors.push(editedString);
              }else if(split.length === 3){
                editedString.author = split[1] + " and " + split[2];
                allAuthors.push(editedString);
              }else{
                allAuthors.push(authorString);
              }
            }
          }
        });
        // console.log(editedString.author);
        // console.log(allAuthors);
        // console.log({ storyData: allStoryStrings });
        var masterArray = [allStoryStrings, allAuthors];
        console.log(masterArray);
        console.log({ storyData: masterArray });
        res.render("read", { storyData: masterArray });
      });
  });

  app.get("/write", function(req, res) {
    db.Story.findAll({
      include: [db.Entry]
    })
      .then(function(entryData){
        if(entryData.length>1 || entryData.length ===1){
          var lastSentence = [];
          var idOfLastSentence = [];
          entryData.forEach(function(val){
            if(lastSentence.length<10){
              if(val.dataValues.Entries.length<3){
                var allText;
                var last = {};
                var storyId = {};
                if(val.dataValues.Entries.length>1){
                  allText = val.dataValues.Entries[val.dataValues.Entries.length-1].dataValues.text;
                  var splitText = allText.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
                  if(splitText.length>1){
                    last.text = splitText[splitText.length - 1];
                  }else{
                    last.text = splitText[0];
                  }
                  storyId.storyId = val.dataValues.Entries[val.dataValues.Entries.length-1].dataValues.StoryId;
                  lastSentence.push(last);
                  idOfLastSentence.push(storyId);
                }else if(val.dataValues.Entries.length === 1){
                  allText= val.dataValues.Entries[0].dataValues.text;
                  splitText = allText.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
                  console.log(allText);
                  console.log(splitText === null);
                  if(splitText === null){
                    last.text = allText;
                  }else{
                    if(splitText.length>1){
                      last.text = splitText[splitText.length - 1];
                    }else{
                      last.text = splitText[0];
                    }
                  }
                  storyId.storyId = val.dataValues.Entries[0].dataValues.StoryId;
                  lastSentence.push(last);
                  idOfLastSentence.push(storyId);
                }
              }
            }
          });
          const idOfLastStory = [{}];
          idOfLastStory[0].id = entryData[entryData.length - 1].id + 1;

          console.log({ lastSentence: lastSentence, idOfLastSentence: idOfLastSentence, idOfLastStory: idOfLastStory });
          res.render("write", { lastSentence: lastSentence, idOfLastSentence: idOfLastSentence, idOfLastStory: idOfLastStory});
        }else{
          var passInObject = [{id: "0"}];
          res.render("write", { idOfLastStory: passInObject});
        }
      });
  });

};