const db = require("../models");

let questionArr;
let playerArr = [];


db.questions.findAll({
    where: {
        category: "Sports"
    },
}).then(function (result) {
    questionArr = result;
    console.log(result);
});


module.exports = function (io) {
   
    io.on('connection', function (socket) {

        playerArr.push({id: socket.id,
            username: socket.request.user.username,
            imageURL: socket.request.user.profilepic,
            lifeScore: socket.request.user.lifetimescore,
            score: 0
        });
        console.log("player data --=-=-=-= " + JSON.stringify(playerArr));

        if(playerArr.length == 2){
            io.emit('ready', true);
            io.emit('players', playerArr);
            io.to(`${socket.id}`).emit('socketID', `${socket.id}`);
        };

        socket.on('logPoints', function(score) {
            console.log(score);
            for(let i = 0; i < playerArr.length; i++){
                if (socket.id == playerArr[i].id){
                    playerArr[i].score = score;
                }
            }
        });

        socket.on('showQuestion', function (questionNumber) {
            let question = questionArr[questionNumber];
        
            
            if (questionNumber < 7) {
                // Move on to the next round
                io.emit('question', question);
            } else {
                // Game over!
                console.log('Game over!');
                io.sockets.emit('gameOver', playerArr);
            }

        });

       
        // socket.emit('news', { hello: 'world' });
        // socket.on('my other event', function (data) {
        // console.log(data);
        // });

        socket.on('answerQuestion', function (questionNumber) {
            let question = questionArr[questionNumber];
            totalAnwsers;
    
            if (totalAnwsers == 2) {
                if (round < 6) {
                    // Move on to the next round
                    io.sockets.emit('nextRound', true);
                } else {
                    // Game over!
                    console.log('Game over!');
                    // io.sockets.emit('gameOver', playerArr);
                }
            }
        });

    

        socket.on('disconnect', function () {
            for(let i = 0; i < playerArr.length; i++){
                if(playerArr[i].id == socket.id){
                    playerArr.splice(i,1);
                };
            };
            io.emit('ready', false);
            // io.emit('playerData', playerArr);
            console.log("user disconnected");
        });


    });













}

    // db.questions.findAll({
    //     where: {
    //         category: "Sports"
    //     },
    // }).then(function (result) {
    //     questionArr = result;
    //     console.log(result);
    // });

    // db.Account.findAll({
    //     group: ['lifetimescore'],
    // }).then(function (result) {
    //     console.log("I have the lifetime max score:", result);
    // });
    
    // io.on("connection", (socket) => {
    //     socket.emit("welcome", "hello and welcome to the socket.io Server");
    //     console.log('user ' + socket.request.user.username + ' connected');
    //     // socket.emit();
    //     userArr.push(socket.request.user.username);
    //     socket.broadcast.emit('playerArray', userArr);
    //     console.log(userArr);
    //     console.log("new client is Connected");

    //     function questionGen() {
    //         if(qIndex < 5 ) {
    //             socket.emit("questions", questionArr[qIndex]);       
    //         }
    //         // // Compare scores - if winner, redirect to winning page
    //         // else if () {
                
    //         //     app.get('/gamewin', function(req, res) {

    //         //     })
    //         // }
    //         // // Redirect to losing page
    //         // else {
    //         //     app.get('/gamelose', function(req, res) {

    //         //     })
    //         // }
    //     }
        
    //     questionGen();


    //     // Handle right answer new question
    //     function newRight() {
    //         qIndex++;
    //         console.log(qIndex);
    //         setTimeout(questionGen, 1500);
    //     }
    
    //      // Handle wrong answer new question
    //      function newWrong() {
    //         qIndex++;
    //         console.log(qIndex);
    //         setTimeout(questionGen, 1500);
    //     }

    //     socket.on('answer', function (data) {
    //         if (data === 'a') {
    //             //answer is correct
    //             io.sockets.emit('right');
    //             newRight();
    //         }
    //         else {
    //             //answer is not correct, no change to user score
    //             io.sockets.emit('wrong');
    //             newWrong();
    //         }
    //     });

    //     socket.on('disconnect', function () {
    //         io.emit('user disconnected');
    //         userArr = [];
    //         console.log("user disconnected");
    //     });

    // });
