let question = document.getElementById('question');
let answerA = document.getElementById('answer_a');
let answerB = document.getElementById('answer_b');
let answerC = document.getElementById('answer_c');
let answerD = document.getElementById('answer_d');

let currentRight = 0;
let currentWrong = 0;
let playerArray;
let playerScores = [0, 0];

let socket = io();
socket.on("welcome", function(data) {
});

socket.on('playerArray', function(data) {
    playerArray = data;
});

socket.on('leaderboard', function(data) {
    leaders = data;
    $(`#leaderboard_content`).empty();
    for (i = 0; i <  leaders.length; i++) {
        $(`#leaderboard_content`).append(" " + leaders[i].username + " " + leaders[i].lifetimescore + " . . . . . . . ");
    };
});


socket.on("questions", function(data) {
    $(`#button_b`).css("background-color", "orange");
    $(`.submit-answer`).prop('disabled', false);
    question.innerHTML = `<p><em>${data.question}</em></p>`;
    answerA.innerHTML = `<p><em>${data.answer}</em></p>`;
    answerB.innerHTML = `<p><em>${data.wrongOne}</em></p>`;
    answerC.innerHTML = `<p><em>${data.wrongTwo}</em></p>`;
    answerD.innerHTML = `<p><em>${data.wrongThree}</em></p>`;
    
});

// socket.on('player1win', function() {
//     app.get('/gamewin', function(req, res) {
    
// })

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
    }
    else {
        $('#player2name').text("Player 2: " + data.username);
        $('#player2pic').attr('src', data.profilepic);
        $('#opponent_total_score').text(`LIFETIME SCORE: ` + data.lifetimescore);
    };
});

socket.on('right', function() {
    currentRight += 1;
    // console.log(socket);
    $(`#answer_a`).empty();
    $(`#button_b`).css("background-color", "greenyellow");
    $(`.submit-answer`).prop('disabled', true);
    $(`#answer_c`).empty();
    $(`#answer_d`).empty();
    console.log(playerArray);
    // console.log(socket.id);
    if (playerArray[0] === socket.id) {
        $(`#answer_b`).html(`Player 1 Correct!`);
        $(`#player_right_count`).html(`RIGHT: ${currentRight}`);
        $(`#player_score`).html(`POINTS: ${currentRight}`);
        playerScores[0] += 1;
        console.log("PlayerScore0: " + playerScores[0]);
        
    }
    else if (playerArray[1] === socket.id){
        $(`#answer_b`).html(`Player 2 Correct!`);
        $(`#opponent_right_count`).html(`RIGHT: ${currentRight}`);
        $(`#opponent_score`).html(`POINTS: ${currentRight}`);
        playerScores[1] += 1;
        console.log("PlayerScore1: " + playerScores[1]);
    };
   
});

socket.on('wrong', function() {
    currentWrong += 1;
    $(`#answer_a`).empty();
    $(`#answer_b`).html(`Wrong!`);
    $(`#button_b`).css("background-color", "red");
    $(`.submit-answer`).prop('disabled', true);
    $(`#answer_c`).empty();
    $(`#answer_d`).empty();
    $(`#player_wrong_count`).html(`WRONG: ${currentWrong}`);
});


$(".submit-answer").on("click", function(event) {
    event.preventDefault();
    
    let userGuess = $(`input[name='answerBtn']:checked`).val();
    
    socket.emit('answer', userGuess);
});        
