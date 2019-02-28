const db = require("../models");

module.exports = function(app){
    app.post('/auth', function(request, response) {
        let username = request.body.username;
        let password = request.body.password;
        if (username && password) {
            db.Account.findOne({
                where: {
                  username: username,
                  password: password
                },
              }).then(function(dbAccount) {
                // response.json(dbAccount);
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/home');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }			
                response.end();
              });
        } 
        else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    });
};