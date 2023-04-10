var canvas;
var ctx;
var playerImage;
var player;
var points;
var timeLeft = 180;
var backgroundImage;
var keysDown;
var fireImage;
var fireImages = [];

function newGame()
{
    // document.getElementById("startButton").addEventListener("click", function() {
    //     // Open a new window for the game
    //     window.open("game.html", "gameWindow", "width=800,height=600");
    // });
    draw()
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    document.getElementById("startButton").addEventListener("click", newGame, false );

    backgroundImage = new Image();
	backgroundImage.src = "/items/inGameBackGround.jpeg";

    playerImage = new Image();
    playerImage.src = "/items/spaceship.png";

    fireImage = new Image();
    fireImage.src = "/items/fire.jpeg";
    
    keysDown = {};

    // Store the keyCode of the pressed key in the keysDown array
    document.addEventListener("keydown", function(event) {keysDown[event.keyCode] = true;});

    // Remove the keyCode of the released key from the keysDown array
    document.addEventListener("keyup", function(event) {delete keysDown[event.keyCode];});

    document.addEventListener("keydown", function(event) {
        keysDown[event.keyCode] = true;
        
        // Detect if the space key is pressed
        if (event.keyCode === 32) {
            // Create a new instance of the fire image at the position of the player
            var newFireImage = {
                x: player.x + player.width / 2,
                y: player.y,
                width: 20,
                height: 40,
                speed: 10,
                image: fireImage
            };
            fireImages.push(newFireImage);
        }
    });

}

function updateFireImages() {
    // Move each fire image up the canvas
    for (var i = 0; i < fireImages.length; i++) {
        var fireImage = fireImages[i];
        fireImage.y -= fireImage.speed;
    }
    
    // Remove fire images that have gone off the top of the canvas
    fireImages = fireImages.filter(function(fireImage) {
        return fireImage.y > -fireImage.height;
    });
}

function drawFireImages() {
    for (var i = 0; i < fireImages.length; i++) {
        var fireImage = fireImages[i];
        ctx.drawImage(fireImage.image, fireImage.x, fireImage.y, fireImage.width, fireImage.height);
    }
}


function draw()
{
   canvas.width = canvas.width; // clears the canvas (from W3C docs)

   // display time remaining
   context.fillStyle = "black";
   context.font = "bold 24px serif";
   context.textBaseline = "top";
   context.fillText("Time remaining: " + timeLeft, 5, 5);

   // if a cannonball is currently on the screen, draw it
   if (cannonballOnScreen)
   { 
      context.fillStyle = "gray";
      context.beginPath();
      context.arc(cannonball.x, cannonball.y, cannonballRadius, 
         0, Math.PI * 2);
      context.closePath();
      context.fill();
   } // end if

   // draw the cannon barrel
   context.beginPath(); // begin a new path
   context.strokeStyle = "black";
   context.moveTo(0, canvasHeight / 2); // path origin
   context.lineTo(barrelEnd.x, barrelEnd.y); 
   context.lineWidth = lineWidth; // line width
   context.stroke(); //draw path

   // draw the cannon base
   context.beginPath();
   context.fillStyle = "gray";
   context.arc(0, canvasHeight / 2, cannonBaseRadius, 0, Math.PI * 2);
   context.closePath();
   context.fill();

   // draw the blocker
   context.beginPath(); // begin a new path
   context.moveTo(blocker.start.x, blocker.start.y); // path origin
   context.lineTo(blocker.end.x, blocker.end.y); 
   context.lineWidth = lineWidth; // line width
   context.stroke(); //draw path

   // initialize currentPoint to the starting point of the target
   var currentPoint = new Object();
   currentPoint.x = target.start.x;
   currentPoint.y = target.start.y; 

   // draw the target
   for (var i = 0; i < TARGET_PIECES; ++i)
   {
      // if this target piece is not hit, draw it
      if (!hitStates[i])
      {
         context.beginPath(); // begin a new path for target

         // alternate coloring the pieces yellow and blue
         if (i % 2 === 0)
            context.strokeStyle = "yellow";
         else
            context.strokeStyle = "blue";

         context.moveTo(currentPoint.x, currentPoint.y); // path origin
         context.lineTo(currentPoint.x, currentPoint.y + pieceLength); 
         context.lineWidth = lineWidth; // line width
         context.stroke(); // draw path
      } // end if
	 
      // move currentPoint to the start of the next piece
      currentPoint.y += pieceLength;
   } // end for
} // end function draw

window.addEventListener("load",newGame,false);

