// REQUIRE MODELS
const db = require('../models/');

// Routes
module.exports = function(app) {
    // Get route for characters
    app.get('/', function(req, res) {
        db.character.findAll({}).then(function(result) {
            let charObj = {
                characters: result
            };
            res.render('characters', charObj)
        });
    });

    app.get('/questions', function(req, res) {
        db.questions.findAll({}).then(function(results) {
            let qObj = {
                questions: results
            };
            res.render('questions', qObj)
        });
    });

};
