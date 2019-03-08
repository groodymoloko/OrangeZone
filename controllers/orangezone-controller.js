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
<<<<<<< HEAD

}
=======
};
>>>>>>> 32fc10f2802c55a5134bc706cd4c3466b1e8ae3c
