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