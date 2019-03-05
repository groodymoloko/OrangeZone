const db = require("../models");

let questionArr;

module.exports = function(io) {
db.questions.findAll({
    where: {
        category: "Sports"
    },
}).then(function(result){
    // let qObj = {
    //     questions: result
    // };
    questionArr = result;
    // console.log(questionArr);
});

io.on("connection", (socket) => {
    socket.emit("welcome", "hello and welcome to the socket.io Server");
    socket.emit("questions", questionArr[0]);

    console.log("new client is Connected");

    socket.on('disconnect', function () {
        io.emit('user disconnected');
        console.log("user disconnected");
    });

});
}
