const db = require("../models");
const bcrypt = require("bcrypt");
const { check, validationResult } = require('express-validator/check');
//number of times it hashes password
const saltRounds = 10;
//authentication packages
const passport = require("passport");


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
    app.post('/register', [
        // check("username").isEmpty().withMessage("Username field cannot be empty."),
        check("username").isLength({min: 4, max:15}).withMessage("Username must be between 4-15 characters long."),
        check("password").withMessage( "Password must be between 8-100 characters long.")
        .isLength({min: 8,max: 100})
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.passwordMatch) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
    ],
    (request, response) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            db.character.findAll({}).then(function(result) {
                let charObj = {
                    characters: result
                };
                // console.log(`Errors ${JSON.stringify(errors.array())}`);
                response.render('characters', {title: "Registration Error", errors: errors.array(), character: charObj});
            });

        }
        else{
            let username = request.body.username;
            let password = request.body.password;
            let passwordMatch = request.body.passwordMatch;
            let image = request.body.profilepic;
            bcrypt.hash(password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                db.Account.create({
                    username: username,
                    password: hash,
                    profilepic: image
                }).then(function(dbAccount) {
                    console.log(`===== ${dbAccount} ========`)
                    // if (dbAccount !== null) {
                        // request.session.loggedin = true;
                        // request.session.username = username;
                        request.login(dbAccount, function(err){
                            response.redirect('/');
                        });
                    // }
                });
            });
        }
    });
};

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    db.Account.findOne({where: {id: id}})
    .then(function(user) {
        ne(null, user);
    });
});