// REQUIRE MODELS
let db = require('../models/');

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
<<<<<<< HEAD

    








}
=======
};
>>>>>>> 34710f4ff1b114c3dd3d14114d2e6ceb0514a40a
