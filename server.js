
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();
const server = require("http").createServer(app);
const session = require('express-session');
const connect = require("connect");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require("passport")
const io = require("socket.io")(server);
const passportSocketIo = require("passport.socketio");
const datab = require("./models/index");


// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));

let myStore = new SequelizeStore({
    db: datab.sequelize
});
app.use(session({
    secret: 'itsasecret',
    resave: false,
    store: myStore,
    saveUninitialized: false,
    proxy: true,
    cookie: {secure: true}
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
    key:          'connect.sid',       // the name of the cookie where express/connect stores its session_id
    secret:       'itsasecret',    // the session_secret to parse the cookie
    store:        myStore,        // we NEED to use a sessionstore. no memorystore please
    // success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
    // fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
}));

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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






