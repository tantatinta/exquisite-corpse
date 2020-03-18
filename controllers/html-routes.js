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
        storyData.forEach(function(val){
          if(allStoryStrings.length<10){
            if(val.dataValues.Entries.length === 3){
              var entriesArray = val.dataValues.Entries;
              var storyObject = { text: ""};
              entriesArray.forEach(function(result){
                storyObject.text += (" " + result.dataValues.text);
              });
              allStoryStrings.push(storyObject);
            }
          }
        });
        console.log({ storyData: allStoryStrings });
        res.render("read", { storyData: allStoryStrings });
      });
  });

  app.get("/write", function(req, res) {
    db.Story.findAll({
      include: [db.Entry]
    })
      .then(function(entryData){
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
              }else{
                last.text = val.dataValues.Entries[0].dataValues.text;
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
      });
  });

};