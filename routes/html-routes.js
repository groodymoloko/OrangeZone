const path = require("path");
// const passport = require("passport");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/login", function(req, res) {
    console.log("=== hello Login");
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/loser", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gameover.html"));
  });

  app.get("/winner", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gameover2.html"));
  });
};
