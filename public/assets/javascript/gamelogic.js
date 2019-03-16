let socket = io();

var Game = {
    players: [],
    ready: false,
    question: 1,
    start: function() {
        Game.ready = true;
        socket.on('players', function(allPlayers) {
            // for(let i = 0; i < allPlayers.length; i++){
            //     Game.players.push(allPlayers[i]);
            // }
            // console.log(Game.players);
            // console.log(players);
            Game.players = allPlayers;
            console.log(Game.players);
            $(`#player_name`).html(`${Game.players[0].username}`);
            $("#player1").attr("src",`${Game.players[0].imageURL}`);
            // $(`#player_right_count`).html(`${Game.players[0].score}`);
            $(`#player2_name`).html(`${Game.players[1].username}`);
            $("#player2").attr("src",`${Game.players[1].imageURL}`);
            // $(`#player2_right_count`).html(`${Game.players[1].score}`);
            Game.renderQuestion();
        });
        
    },
    renderQuestion: function() {
        socket.emit("showQuestion", Game.question);
    },
    answerQuestion: function(choice) {
        if(choice){
            Player.score = Player.score + 1;
            Player.addPoints();
        }
        Game.question++;
        console.log(Game.question);
        console.log(Player.score);
        Game.renderQuestion();
    },
    stop: function () {
        Game.ready = false;
        Game.question = 1;
        Player.score = 0;
        // $("#waiting").show();
        // $(".player-info").show();
        // $(".game").hide();
        // $(".intro").hide();
        // $(".results").hide();
    }
    // showPlayers: function() {

    // }
}

var Player = {
    id: '',
    userName: '',
    score: 0,
    addPoints: function() {
        socket.emit("logPoints", Player.score);
    },
    deductPoints: function() {
        Player.score = Player.score - 3;
        socket.emit("logPoints", this);
    }
};

socket.on('ready', function(ready) {
    if (ready) {
        console.log('Game has 2 players, ready to start!');
        Game.start();
    } else {
        console.log('1 or more players have left, resetting game...');
        Game.stop();
    }
});

socket.on('gameover', function(data) {
    $(`#answer_a`).empty();
    $(`#button_b`).css("background-color", "greenyellow");
    $(`#button_b`).html(`GAME OVER!`);
    $(`.submit-answer`).prop('disabled', true);
    $(`#answer_c`).empty();
    $(`#answer_d`).empty();
    console.log(playerScores);
    socket.emit('playerscores', playerScores);
});

socket.on('player1win', function(data) {
    $(`#answer_a`).html(`YOU WIN!`);
});

socket.on('player2win', function(data) {
    $(`#answer_a`).html(`YOU WIN!`);
});

socket.on('player1lose', function(data) {
    $(`#answer_a`).html(`YOU LOSE!`);
});

socket.on('player2lose', function(data) {
    $(`#answer_a`).html(`YOU LOSE!`);
});

socket.on('userInfo', function(data) {
    if(data.id === 1 ) {
        $('#player1name').text("Player 1: " + data.username);
        $('#player1pic').attr('src', data.profilepic);
        $('#player_total_score').text(`LIFETIME SCORE: ` + data.lifetimescore);

socket.on('gameOver', function(data) {
console.log(data);
    let highScore = Math.max(data[0].score, data[1].score);
    let winner;
    for(let i = 0; i < data.length; i++){
        if(highScore == data[i].score){
            // winner = data[i].username;
            $(`#question`).html(`The winner is: ${data[i].username} with a score of ${data[i].score}`);
            Game.stop();
        }
    }
});

socket.on('socketID', function(socketid) {
    for(let i = 0; i < Game.players.length; i++){
        if(Game.players[i].id == socketid){
            Player.id = Game.players[i].id;
            Player.userName = Game.players[i].username;
            console.log(Player.userName);
        }
    }
    console.log(Game.players);
    // Game.players = players;
});

socket.on('question', function(q) {
    $(`#question`).html(`${q.question}`);
    $(`#answer_a`).html(`${q.answer}`);
    $(`#answer_b`).html(`${q.wrongOne}`);
    $(`#answer_c`).html(`${q.wrongTwo}`);
    $(`#answer_d`).html(`${q.wrongThree}`);
});

$(".submit-answer").on("click", function(event) {
    event.preventDefault();

    let userGuess = $(`input[name='answerBtn']:checked`).val();
    console.log(userGuess);

    if(userGuess == "a"){
        Game.answerQuestion(true);
    }
    else{
        Game.answerQuestion(false);
    }
    
    // socket.emit('answer', userGuess);
});   

     









// let question = document.getElementById('question');
// let answerA = document.getElementById('answer_a');
// let answerB = document.getElementById('answer_b');
// let answerC = document.getElementById('answer_c');
// let answerD = document.getElementById('answer_d');
// console.log("hello gamelogic has run");

// let currentRight = 0;
// let currentWrong = 0;
// let playerArray;


// console.log("gamelogic.js ran");
// socket.on("welcome", function(data) {
//     console.log(data);
// });

// socket.on('playerArray', function(data) {
//     playerArray = data;
//     console.log(playerArray);
// });


// socket.on("questions", function(data) {
//     console.log(data);
//     $(`#button_b`).css("background-color", "orange");
//     $(`.submit-answer`).prop('disabled', false);
//     question.innerHTML = `<p><em>${data.question}</em></p>`;
//     answerA.innerHTML = `<p><em>${data.answer}</em></p>`;
//     answerB.innerHTML = `<p><em>${data.wrongOne}</em></p>`;
//     answerC.innerHTML = `<p><em>${data.wrongTwo}</em></p>`;
//     answerD.innerHTML = `<p><em>${data.wrongThree}</em></p>`;
    
// });

// socket.on('right', function() {
//     currentRight += 1;
//     console.log(currentRight);
//     $(`#answer_a`).empty();
//     $(`#answer_b`).html(`Correct!`);
//     $(`#button_b`).css("background-color", "green");
//     $(`.submit-answer`).prop('disabled', true);
//     $(`#answer_c`).empty();
//     $(`#answer_d`).empty();
//     $(`#player_right_count`).html(`RIGHT: ${currentRight}`);
//     $(`#player_score`).html(`POINTS: `, currentRight);
//     $(`#opponent_score`).html(`POINTS: `, currentRight);
//     // $(`#opponent_right_count`).html(`Right: ${currentRight}`);
// });

// socket.on('wrong', function() {
//     currentWrong += 1;
//     console.log(currentWrong);
//     $(`#answer_a`).empty();
//     $(`#answer_b`).html(`Wrong!`);
//     $(`#button_b`).css("background-color", "red");
//     $(`.submit-answer`).prop('disabled', true);
//     $(`#answer_c`).empty();
//     $(`#answer_d`).empty();
//     $(`#player_wrong_count`).html(`WRONG: ${currentWrong}`);
//     // $(`#opponent_wrong_count`).html(`Wrong: ${currentWrong}`);
// });


// $(".submit-answer").on("click", function(event) {
//     event.preventDefault();

//     let userGuess = $(`input[name='answerBtn']:checked`).val();
//     console.log(userGuess);
    
//     socket.emit('answer', userGuess);
// });