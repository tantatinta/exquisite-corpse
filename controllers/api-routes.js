
var db = require("../models");

module.exports = function(app) {

  app.get("/api/todos", function(req, res) {
    db.Todo.findAll({}).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  app.post("/api/todos", function(req, res) {
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  app.put("/api/todos", function(req, res) {
    req;
    res;
  });
};
