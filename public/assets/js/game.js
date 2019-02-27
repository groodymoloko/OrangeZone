// const io = require("socket.io-client");
let socket = io.connect("http://localhost");
console.log("game.js ran")
socket.on("welcome", function(data) {
    console.log(data);
});