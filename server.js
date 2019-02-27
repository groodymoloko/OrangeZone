
const express = require('express');
const app = express();
const PORT = 8080;
const http = require("http").createServer();
const io = require("socket.io")(http);

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Static directory
// app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
    socket.emit("welcome", "hello and welcome to the socket.io Server");
    console.log("new client is Connected");

    socket.on('disconnect', function () {
        io.emit('user disconnected');
        console.log("user disconnected");
    });
});

http.listen(PORT, () => {
    console.log("Server is listening on localhost: " + PORT);
});







