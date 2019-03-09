let question = document.getElementById('question');
let answerA = document.getElementById('answer_a');
let answerB = document.getElementById('answer_b');
let answerC = document.getElementById('answer_c');
let answerD = document.getElementById('answer_d');
console.log("hello gamelogic has run");

let currentRight = 0;
let currentWrong = 0;
let playerArray = [];
let player1 = playerArray[0];
let player2 = playerArray[1];

let socket = io();
console.log("gamelogic.js ran");
socket.on("welcome", function(data) {
    console.log(data);
});

socket.on('playerArray', function(data) {
    playerArray.push(data);
    console.log(playerArray);
});
    
socket.on('leaderboard', function(data) {
    let leaders = data;
    for (let i = 0; i < leaders.length; i++) {
        $(`#leaderboard_content`).append(" " + leaders[i].username + " " + leaders[i].lifetimescore + " . . . . . . . ");
    };
});


socket.on("questions", function(data) {
    console.log(data);
    $(`#button_b`).css("background-color", "orange");
    $(`.submit-answer`).prop('disabled', false);
    question.innerHTML = `<p><em>${data.question}</em></p>`;
    answerA.innerHTML = `<p><em>${data.answer}</em></p>`;
    answerB.innerHTML = `<p><em>${data.wrongOne}</em></p>`;
    answerC.innerHTML = `<p><em>${data.wrongTwo}</em></p>`;
    answerD.innerHTML = `<p><em>${data.wrongThree}</em></p>`;
    
});

socket.on('userInfo', function(data) {
    console.log(data.profilepic);
    if(data.id === 1 ) {
        $('#player1name').text(data.username);
        $('#player1pic').attr('src', data.profilepic);
        $('#player_total_score').text(`LIFETIME SCORE: ` + data.lifetimescore);
    }
    else {
        $('#player2name').text(data.username);
        $('#player2pic').attr('src', data.profilepic);
        $('#opponent_total_score').text(`LIFETIME SCORE: ` + data.lifetimescore);
    }
});

socket.on('right', function() {
    currentRight += 1;
    console.log(currentRight);
    $(`#answer_a`).empty();
    $(`#answer_b`).html(`Correct!`);
    $(`#button_b`).css("background-color", "green");
    $(`.submit-answer`).prop('disabled', true);
    $(`#answer_c`).empty();
    $(`#answer_d`).empty();
    $(`#player_right_count`).html(`RIGHT: ${currentRight}`);
    $(`#player_score`).html(`POINTS: ${currentRight}`);
});

socket.on('wrong', function() {
    currentWrong += 1;
    console.log(currentWrong);
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
    console.log(userGuess);
    
    socket.emit('answer', userGuess); // Contains  socket ID of user who clicked?
});        
