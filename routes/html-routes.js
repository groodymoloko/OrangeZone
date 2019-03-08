const path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/bigbrains", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/big_brains.html"));
  });

  app.get("/loser", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gameover.html"));
  });

  app.get("/winner", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gameover2.html"));
  });

  // app.get("/register", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/create_account.html"));
  // });

};
