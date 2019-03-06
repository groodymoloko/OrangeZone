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

    socket.on('answer', function(data) {
        if(data === 'a') {
            //answer is correct
            db.accounts.update({
                // need to update score here
            }).then(function(updateScore) {
                // print new user score to screen
            })
        }
        else {
            //answer is not correct, no change to user score
        }
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected');
        console.log("user disconnected");
    });

});
}
