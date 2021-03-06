var db = require("../models");
const randomWords = require("random-words");
module.exports = function (app) {

  // working
  app.get("/api/entry/:author", function (req, res) {
    db.Entry.findAll({
      where: {
        author: req.params.author
      },
    }).then(function (storyData) {
      res.json(storyData);
    });
  });

  // Working
  app.get("/api/story/return", function (req, res) {
    db.Story.findAll({
      include: [db.Entry]
    }).then(function (storyData) {
      res.json(storyData);
    });
  });

  // for creating a new story title *Working*
  app.post("/api/story", function (req, res) {
    db.Story.create({
    }).then(function (dbStory) {
      res.json(dbStory);
    }).catch(function (err) {
      res.json(err);
    });
  });

  // for creating an entry *Working*
  app.post("/api/entry", function (req, res) {
    db.Entry.create(
      {
        text: req.body.text,
        author: req.body.author,
        StoryId: req.body.StoryId
      }
      // req.body
    ).then(function (dbEntry) {
      console.log(dbEntry, "This is success");
      res.json(dbEntry);
    }).catch(function (err) {
      console.log(err, "This is error");
      res.json(err);
    });
  });

  //for creating a random words object
  app.get("/api/randomword", function (req, res) {
    res.json(randomWords({exactly:5, wordsPerString:2}));
  });
};
