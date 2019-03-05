// REQUIRE MODELS
let db = require('../models/');

// Routes
module.exports = function(app) {
    // Get route for characters
    app.get('/register', function(req, res) {
        db.character.findAll({}).then(function(result) {
            let charObj = {
                characters: result
            };
            res.render('characters', {character: charObj})
        });
    });

}
