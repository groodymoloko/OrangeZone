const db = require("../models");

let questionArr;
let userArr = [];
let leadersArr = [];
let qIndex = 0;
let player1 = userArr[0];
let player2 = userArr[1];
let leaders;

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
        order: ['lifetimescore'],
    }).then(function (result) {
        leaders = result;
        // console.log(result);
    });
    
    io.on("connection", (socket) => {
        socket.emit("welcome", "hello and welcome to the socket.io Server");
        userArr.push(socket.request.user.username);
        socket.broadcast.emit('playerArray', userArr);
        socket.emit('leaderboard', leaders);
        io.sockets.emit('userInfo', socket.request.user);
        // console.log(userArr);
        // console.log("new client is Connected");

        function questionGen() {
            if(qIndex < 5 ) {
                socket.emit('userInfo', socket.request.user);
                socket.emit("questions", questionArr[qIndex]);       
            }
            // // Compare scores - if winner, redirect to winning page
            // else if () {
                
            //     app.get('/winner', function(req, res) {

            //     })
            // }
            // // Redirect to losing page
            // else {
            //     app.get('/loser', function(req, res) {

            //     })
            // }
        }
        
        questionGen();


        // Handle right answer new question
        function newRight() {
            qIndex++;
            // console.log(qIndex);
            setTimeout(questionGen, 1500);
        }
    
         // Handle wrong answer new question
         function newWrong() {
            qIndex++;
            // console.log(qIndex);
            setTimeout(questionGen, 1500);
        }

        socket.on('answer', function (data) {
            // Can we pull socket ID here to determine which user answered?
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
