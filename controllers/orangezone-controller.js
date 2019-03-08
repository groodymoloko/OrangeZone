// REQUIRE MODELS
let db = require('../models/');

// Routes
module.exports = function(app) {
    app.get('/', function(req, res) {
        console.log("index ran")
        console.log("===============" + JSON.stringify(req.user));
        console.log("===============" + req.isAuthenticated());
        res.render('index');
    });
    // Get route for characters
    app.get('/register', function(req, res) {
        db.character.findAll({}).then(function(result) {
            let charObj = {
                characters: result
            };
            res.render('characters', {character: charObj});
        });
    });
};
