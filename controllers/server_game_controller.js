const db = require("../models");

let questionArr;
let userArr = [];
let leadersArr;
let qIndex = 0;
let player1 = userArr[0];
let player2 = userArr[1];
let finalScores;

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
        leadersArr = result;
        // console.log(result);
    });
    
    io.on("connection", (socket) => {
        socket.emit("welcome", "hello and welcome to the socket.io Server");
        // userArr.push(socket.request.user.username);
        userArr.push(socket.id);
        console.log(userArr);
        io.sockets.emit('playerArray', userArr);
        socket.emit('leaderboard', leadersArr);
        io.sockets.emit('userInfo', socket.request.user);
        // console.log(userArr);
        // console.log("new client is Connected");

        function questionGen() {
            if(qIndex < 5 ) {
                io.sockets.emit('userInfo', socket.request.user);
                // console.log(socket.request.user);
                io.sockets.emit("questions", questionArr[qIndex]);       
            } else {
                io.sockets.emit('gameover');
                socket.on('playerscores', function(data) {
                    console.log(data);
                    // finalScores = data;

                    if (data[0] > 2 ) {
                        console.log("Player 1 Wins!");
                        io.to(`${userArr[0]}`).emit(`player1win`);
                        // app.get("/winner", function(req, res) {
                        //     res.sendFile(path.join(__dirname, "../public/gameover2.html"));
                        //   });
                       
                        io.to(`${userArr[1]}`).emit(`player2lose`);
                        // app.get("/loser", function(req, res) {
                        //     res.sendFile(path.join(__dirname, "../public/gameover.html"));
                        //   });
                    }
                    // Redirect to losing page
                    else {
                        io.to(`${userArr[1]}`).emit(`player2win`);
                        // app.get("/winner", function(req, res) {
                        //     res.sendFile(path.join(__dirname, "../public/gameover2.html"));
                        //   });
                        io.to(`${userArr[0]}`).emit(`player1lose`);
                        // app.get("/loser", function(req, res) {
                        //     res.sendFile(path.join(__dirname, "../public/gameover.html"));
                        // });
                    };
                });
                
            };
        };
        
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
            if (data === 'a') {
                //answer is correct
                socket.emit('right');
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
            console.log("Socket ID yo: " + socket.id);
            socket.disconnect();
            
        });

    });

}
