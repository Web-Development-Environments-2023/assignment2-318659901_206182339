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

window.addEventListener("load",newGame,false);

function newGame()
{
    // document.getElementById("startButton").addEventListener("click", function() {
    //     // Open a new window for the game
    //     window.open("game.html", "gameWindow", "width=800,height=600");
    // });
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
};

function drawFireImages() {
    for (var i = 0; i < fireImages.length; i++) {
        var fireImage = fireImages[i];
        ctx.drawImage(fireImage.image, fireImage.x, fireImage.y, fireImage.width, fireImage.height);
    }
};


// Update game objects - change player position based on key pressed
function updatePositions(modifier) {
	if ((38 in keysDown) ) { // Player holding up
		if(hero.y>=20)
		hero.y -= hero.speed * modifier;
	}
	if ((40 in keysDown) ) { // Player holding down
		if(hero.y<=440)
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		if(hero.x>=20)
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		if(hero.x<=492)
		hero.x += hero.speed * modifier;	
	}


  // Check if player and monster collider
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		obj.play();//play music
		reset();
	}

	--timeLeft;
	 // if the timer reached zero
   if (timeLeft <= 0)
   {
      stopTimer();
      alert("You lost"); // show the losing dialog
   } // end
};


// Draw everything on the canvas
function draw() {

		
		if(document.getElementById("rdbimg").checked)
{
		ctx.drawImage(bgImage, 0, 0);
	
	}
else
{
	clear();
	DrawCircles();
	MoveCircles(5);
}
		ctx.drawImage(heroImage, hero.x, hero.y);
	
		ctx.drawImage(monsterImage, monster.x, monster.y);
	

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught + " Time left :" +  timeLeft/1000 , 32, 32);
	
	
};

function main() {
	var now = Date.now();
	var delta = now - then;
	
	updatePositions(delta / 1000);
	draw();	
	
	then = now;
};


var clear = function(){  
    ctx.fillStyle = '#d0e7f9';  
  //set active color to #d0e... (nice blue)  
  //UPDATE - as 'Ped7g' noticed - using clearRect() in here is useless, we cover whole surface of the canvas with //blue rectangle two lines below. I just forget to remove that line  
  //ctx.clearRect(0, 0, canvas.width, canvas.height);  
  //clear whole surface  
    ctx.beginPath();  
  //start drawing  
    ctx.rect(0, 0, canvas.width, canvas.height);  
  //draw rectangle from point (0, 0) to  
  //(width, height) covering whole canvas  
    ctx.closePath();  
  //end drawing  
    ctx.fill();  
  //fill rectangle with active  
  //color selected before  
  };  

  var DrawCircles = function(){

    for (var i = 0; i < howManyCircles; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
  //white color with transparency in rgba
      ctx.beginPath();
      ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
  //arc(x, y, radius, startAngle, endAngle, anticlockwise)
  //circle has always PI*2 end angle
      ctx.closePath();
      ctx.fill();
    }
  };
  
  
  var MoveCircles = function(deltaY){  
    for (var i = 0; i < howManyCircles; i++) {  
      if (circles[i][1] - circles[i][2] > canvas.height) {  
  //the circle is under the screen so we change  
  //informations about it   
        circles[i][0] = Math.random() * canvas.width;  
        circles[i][2] = Math.random() * 100;  
        circles[i][1] = 0 - circles[i][2];  
        circles[i][3] = Math.random() / 2;  
      } else {  
  //move circle deltaY pixels down  
        circles[i][1] += deltaY;  
      }  
    }  
  }; 
  
  
function newGame2()
{
	reset();
	then = Date.now();
	intervalTimer = setInterval(main, 1); // Execute as fast as possible
}

// Reset the player and monster positions when player catches a monster
function reset() {
	// Reset player's position to centre of canvas
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};




