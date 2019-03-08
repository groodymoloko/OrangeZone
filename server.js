
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();
const server = require("http").createServer(app);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require("passport")
const io = require("socket.io")(server);
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");


console.log(config.username);
// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));
//used to determine if user is logged in
const options = {
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database
};
const sessionStore = new MySQLStore(options);
app.use(session({
	secret: 'itsasecret',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    // cookie: {secure: true}
}));
//set up passport.js
app.use(passport.initialize());
app.use(passport.session());
//sends is authenticated to all routes
app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});
io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key:          'express.sid',
    secret:       process.env.SESSION_SECRET,
    store:        sessionStore
}));

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");




// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// });
require("./routes/html-routes")(app);
require("./routes/login")(app);
require("./controllers/orangezone-controller")(app);

require("./controllers/server_game_controller")(io);




// Requiring our models for syncing
var db = require("./models");

db.sequelize.sync().then(function() {
    server.listen(PORT, () => {
        console.log("Server is listening on localhost: " + PORT);
    });
});






