let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = [];
let started = false;
let level = 0 ;


//game starting using keypress
$(document).keypress(function() {
    if (!started) {
    $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//button click handler
$(".btn").click( function () {
    var clickedButton = $(this).attr('id');
    userClickedPattern.push(clickedButton);
    // console.log(userClickedPattern);
    playSound(clickedButton);
    animPress(clickedButton);
    checkAnswer(userClickedPattern.length-1);
    

});



let nextSequence = () => {
    userClickedPattern =[];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    

}



//sounds to our button
let playSound = (name) => {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}

//animation to our buttons 
let animPress = (choosenColor) => {
    $("#" + choosenColor).addClass('pressed');
    setTimeout(() => {
        $("#" + choosenColor).removeClass('pressed', 100);
    })

}

//restarting game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  


