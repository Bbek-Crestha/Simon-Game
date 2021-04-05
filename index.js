var buttonColors = ["green", "blue", "red", "yellow"];

var gamePattern = [];
var clickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){
    if(!started) {
        $(".title").text("LEVEL " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    clickedPattern.push(userChosenColor);

    animateKeyPress(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(clickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $(".title").text("LEVEL " + level);

    var randomNumber = Math.floor( Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);

    $("#" + chosenColor).fadeIn(200).fadeOut(200).fadeIn(200);

    playSound(chosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {
        if (clickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        $(".title").text("GAME OVER, PRESS ANY KEY TO RESTART");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateKeyPress(color) {
    $("#" + color).addClass("blink");
    setTimeout(function(){
        $("#" + color).removeClass("blink");
    }, 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
    clickedPattern = [];
    started = false;
}