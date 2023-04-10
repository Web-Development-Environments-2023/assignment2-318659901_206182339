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


window.addEventListener("load",newGame,false);

