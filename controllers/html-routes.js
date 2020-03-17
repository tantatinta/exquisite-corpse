var db = require("../models");
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/read", function(req, res) {
    db.Story.findAll({
      include: [db.Entry]
    })
      .then(function(allCompleteStories){
        var storyLength;
        var sentArray = [];
        if(allCompleteStories.length<10){
          storyLength = 0;
        }else{
          storyLength = allCompleteStories.length - 10;
        }
        for (var i = storyLength; i<allCompleteStories.length; i++){
          sentArray.push(allCompleteStories[i].dataValues);
        }
        console.log(sentArray);
        res.render("read", { allCompleteStories: sentArray });
      });

  });

  app.get("/write", function(req, res) {
    db.Story.findAll({
      include: [db.Entry]
    })
      .then(function(entryData){
        var sentArray = [];

        entryData.forEach(function(val){
          if(val.dataValues.Entries.length<4){
            sentArray.push(val.dataValues.Entries[val.dataValues.Entries.length-1].dataValues);
          }
        });
        console.log(sentArray);
        res.render("write", { entryData: sentArray });
      });
  });

};
