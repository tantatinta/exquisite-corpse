
var db = require("../models");

module.exports = function(app) {

  // for finding a specific story and all associated entries
  app.get("/api/story:id", function(req, res) {
    db.Stroy.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Entry]
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // for creating a new story title
  app.post("/api/story", function(req, res) {
    db.Story.create({
      title: req.body.title,
    }).then(function(dbStory) {
      res.json(dbStory);
    }).catch(function(err){
      res.json(err);
    });
  });


  // for creating an entry
  app.post("/api/entry", function(req, res) {
    db.Entry.create({
      text: req.body.text,
      author: req.body.author,
      // do i need to add an ID or is that done automatically with sequelize?
    }).then(function(dbEntry) {
      res.json(dbEntry);
    }).catch(function(err){
      res.json(err);
    });
  });
};
