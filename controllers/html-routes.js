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
        console.log(allCompleteStories[0].dataValues.Entries[1].dataValues);
        // console.log({ allCompleteStories: allCompleteStories });
        res.render("read", { allCompleteStories: allCompleteStories });
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
