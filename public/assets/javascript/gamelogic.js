
let socket = io();
console.log("game.js ran");
socket.on("welcome", function(data) {
    console.log(data);
});
socket.on("questions", function(data) {
    console.log(data);
    
});