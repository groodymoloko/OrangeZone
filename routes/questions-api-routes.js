const db = require("../models/questions.js");

module.exports = function(app) {

    app.get("/questions/:category?", function(req, res) {
        Questions.findAll().then(function(result) {
          return res.json(result);
        });
    });
}