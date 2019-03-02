<<<<<<< HEAD
// DEPENDENCIES
const express = require('express');

// SET UP EXPRESS APP
const app = express();
const PORT = process.env.PORT || 8080;

// REQUIRE MODELS
let db = require('./models');

// HANDLE DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// LINK TO STATIC DIRECTORY
app.use(express.static('public'));

// HANDLEBARS ENGINE
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ROUTES
require('./controllers/orangezone-controller.js')(app);

// SYNC SEQUELIZE MODELS, START APP
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log(`App listening on PORT: ${PORT}`);
    });
});
=======

const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 8080;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//used to determine if user is logged in
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
// app.use(express.static('node_modules'));
// app.use("/public", express.static(__dirname + "/public"));
// app.use("/js", express.static(__dirname + "/public/js"));
app.use(express.static("public"));

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// });
require("./routes/html-routes")(app);
require("./routes/login")(app);



io.on("connection", (socket) => {
    socket.emit("welcome", "hello and welcome to the socket.io Server");
    console.log("new client is Connected");

    socket.on('disconnect', function () {
        io.emit('user disconnected');
        console.log("user disconnected");
    });
});

// Requiring our models for syncing
var db = require("./models");

db.sequelize.sync({force: true}).then(function() {
    server.listen(PORT, () => {
        console.log("Server is listening on localhost: " + PORT);
    });
});






>>>>>>> 34710f4ff1b114c3dd3d14114d2e6ceb0514a40a
