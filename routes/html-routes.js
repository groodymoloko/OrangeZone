const path = require("path");
// const passport = require("passport");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  // app.get("/", function(req, res) {
  //   console.log("hello");
  //   console.log("===============" + req.user);
  //   console.log("===============" + req.isAuthenticated());
  //   res.render('index');
  // });

  app.get("/login", function(req, res) {
    console.log("=== hello Login");
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });



  // app.get("/register", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/create_account.html"));
  // });

};
