var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start=false;
var level=0;

//The actual game:
// Checks if the elements on both arrays are equal, then checks if their lengths are also equal,
// in that case the nextSequence() function will be called again after a 1000 milisecond delay
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success!");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();
  }
}

//Levels
$(document).keydown(function(){
  if(!start){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//Random color selector
function nextSequence() {
 userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var number = Math.round(Math.random() * 4);

  var randomChosenColour = buttonColors[number];
  
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//Plays sound after the button is being pressed
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatedPress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//Creates a audio object
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
//Animates pressed button
function animatedPress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

//Start Over The Game(resets all variables)
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}