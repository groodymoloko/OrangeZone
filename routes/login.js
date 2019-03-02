const db = require("../models");

module.exports = function(app){
    app.post('/login/auth', function(request, response) {
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
                console.log(`===== ${dbAccount} ========`)
                if (dbAccount !== null) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/');
                } 
                else if (dbAccount == null){
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
    app.post('/register', function(request, response) {
        let username = request.body.username;
        let password = request.body.password;
        let image = request.body.profilepic;
        console.log("this is the image url"+ image);
        if (username && password) {
            db.Account.create(request.body).then(function(dbAccount) {
                // response.json(dbAccount);
                console.log(`===== ${dbAccount} ========`)
                if (dbAccount !== null) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/login');
                } 
                else if (dbAccount == null){
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