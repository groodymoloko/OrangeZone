const io = require("socket.io-client");
let socket = io.connect("http://localhost:8080");
console.log("game.js ran");
socket.on("welcome", function(data) {
    console.log(data);
});