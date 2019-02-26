
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const http = require("http").createServer();
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    socket.emit("welcome", "hello and welcome to the socket.io Server");
    console.log("new client is Connected");
});

http.listen(port, () => {
    console.log("Server is listening on localhost: " + port);
});




