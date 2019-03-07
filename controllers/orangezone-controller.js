// REQUIRE MODELS
let db = require('../models/');

// Routes
module.exports = function(app) {
    app.get('/', function(req, res) {
        console.log("index ran")
        console.log("===============" + req.user);
        console.log("===============" + req.isAuthenticated());
        res.render('index', {ran: "is running"});
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
}
