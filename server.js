
const express = require('express');
const app = express();
// const PORT = 8080;
const server = require("http").createServer(app);
const io = require("socket.io")(server);


// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Static directory
app.use("/public", express.static(__dirname + "/public"));
app.use("/js", express.static(__dirname + "/public/js"));



io.on("connection", (socket) => {
    socket.emit("welcome", "hello and welcome to the socket.io Server");
    console.log("new client is Connected");

    socket.on('disconnect', function () {
        io.emit('user disconnected');
        console.log("user disconnected");
    });
});

server.listen(8080, () => {
    console.log("Server is listening on localhost: " + 8080);
});







