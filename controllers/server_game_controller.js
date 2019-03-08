const db = require("../models");

let questionArr;
let userArr = [];
let qIndex = 0;
let player1 = userArr[0];
let player2 = userArr[1];

module.exports = function (io) {
    // Grabbing 10 questions for current quiz
    db.questions.findAll({
        where: {
            category: "Sports"
        },
    }).then(function (result) {
        questionArr = result;
    });

    db.Account.findAll({
        group: ['lifetimescore'],
    }).then(function (result) {
        console.log("I have the lifetime max score:", result);
    });
    
    io.on("connection", (socket) => {
        socket.emit("welcome", "hello and welcome to the socket.io Server");
        console.log('user ' + socket.request.user.username + ' connected');
        socket.emit();
        userArr.push(socket.request.user.username);
        socket.broadcast.emit('playerArray', userArr);
        console.log(userArr);
        console.log("new client is Connected");

        function questionGen() {
            if(qIndex < 5 ) {
                socket.emit("questions", questionArr[qIndex]);       
            }
            // // Compare scores - if winner, redirect to winning page
            // else if () {
                
            //     app.get('/gamewin', function(req, res) {

            //     })
            // }
            // // Redirect to losing page
            // else {
            //     app.get('/gamelose', function(req, res) {

            //     })
            // }
        }
        
        questionGen();


        // Handle right answer new question
        function newRight() {
            qIndex++;
            console.log(qIndex);
            setTimeout(questionGen, 1500);
        }
    
         // Handle wrong answer new question
         function newWrong() {
            qIndex++;
            console.log(qIndex);
            setTimeout(questionGen, 1500);
        }

        socket.on('answer', function (data) {
            if (data === 'a') {
                //answer is correct
                io.sockets.emit('right');
                newRight();
            }
            else {
                //answer is not correct, no change to user score
                io.sockets.emit('wrong');
                newWrong();
            }
        });

        socket.on('disconnect', function () {
            io.emit('user disconnected');
            userArr = [];
            console.log("user disconnected");
        });

    });

}
