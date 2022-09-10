
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $(".instructions").text("Level " + level);
}

$(".game-button").click(function(event){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if(!started){
    nextSequence();
    started = true;
  }
});

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(started){
    var check_answer = gamePattern[currentLevel] === userClickedPattern[currentLevel];
    if(check_answer && gamePattern.length === currentLevel+1){
      userClickedPattern = [];
      setTimeout(nextSequence, 500);
    }
    else if(!check_answer){
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      level = 0;
      started = false;
      gamePattern = [];
      userClickedPattern = [];
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200); //200ms
      $(".instructions").text("Press A Key to Start");
    }
  }

}
