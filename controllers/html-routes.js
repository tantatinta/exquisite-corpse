var db = require("../models");
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("main");
  });

  app.get("/read", function(req, res) {
    db.Story.findAll({
      include: [db.Entry]
    })
      .then(function(allCompleteStories){
        // console.log(allCompleteStories[0].dataValues.Entries[1].dataValues);
        // console.log(allCompleteStories.length);
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
        // console.log(sentArray);
        // console.log({ allCompleteStories: sentArray });
        // console.log(sentArray[0].Entries[1].dataValues);
        res.render("read", { allCompleteStories: sentArray });
      });

    // db.Entry.findAll({
    // })
    //   .then(function(allCompleteStories){
    //     // console.log({ allCompleteStories: allCompleteStories });
    //     res.render("read", { allCompleteStories: allCompleteStories });
    //   });
  });

  app.get("/write", function(req, res) {
    res.render("write");
  });

};
