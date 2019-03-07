let question = document.getElementById('question');
let answerA = document.getElementById('answer_a');
let answerB = document.getElementById('answer_b');
let answerC = document.getElementById('answer_c');
let answerD = document.getElementById('answer_d');

let currentRight = 0;
let currentWrong = 0;
let playerArray;

let socket = io();
console.log("game.js ran");
socket.on("welcome", function(data) {
    console.log(data);
});

socket.on('playerArray', function(data) {
    playerArray = data;
    console.log(playerArray);
});


socket.on("questions", function(data) {
    console.log(data);
    question.innerHTML = `<p><em>${data.question}</em></p>`;
    answerA.innerHTML = `<p><em>${data.answer}</em></p>`;
    answerB.innerHTML = `<p><em>${data.wrongOne}</em></p>`;
    answerC.innerHTML = `<p><em>${data.wrongTwo}</em></p>`;
    answerD.innerHTML = `<p><em>${data.wrongThree}</em></p>`;
    
});

socket.on('right', function() {
    currentRight += 1;
    console.log(currentRight);
    $(`#player_right_count`).html(`Right: ${currentRight}`);
    $(`#player_score`).html(currentRight);
    $(`#opponent_score`).html(currentRight);

    // $(`#opponent_right_count`).html(`Right: ${currentRight}`);
});

socket.on('wrong', function() {
    currentWrong += 1;
    console.log(currentWrong);
    $(`#player_wrong_count`).html(`Wrong: ${currentWrong}`);
    // $(`#opponent_wrong_count`).html(`Wrong: ${currentWrong}`);
});


$(".submit-answer").on("click", function(event) {
    event.preventDefault();

    let userGuess = $(`input[name='answerBtn']:checked`).val();
    console.log(userGuess);
    
    socket.emit('answer', userGuess);
});        
