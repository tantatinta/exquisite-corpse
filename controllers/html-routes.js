
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/read", function(req, res) {
    res.render("read");
  });

  app.get("/write", function(req, res) {
    res.render("write");
  });

};
