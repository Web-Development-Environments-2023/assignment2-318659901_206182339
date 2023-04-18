var canvas; // the canvas
var context; // used for drawing on the canvas
var canvasWidth;
var canvasHeight;

var enemyFireX;
var enemyFireY;
var playerHp;
var playerX;
var playerY;

var floorY;
var topY;

//users and passswords
var user1 = {
  password: "testuser",
  email: "p",
  birthday: "p",
  firstname: "p",
  lastname: "p",
};
var users = {
  p: user1,
};

// constants for the game

//EnemySpaceShips
var enemy_ships;
var friendly_ship;
var inGame;
var EnemyMove;
var change_direction;

//game variables
var NumRows = 4;
var NumCols = 5;
var WidthDistanceFactor = 0.8;
var HeightEnemy = 0.4;
var HeightFriendly = 0.4;

var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var UP_KEY = 38;
var DOWN_KEY = 40;
var FIRE_KEY;
var SCORE = 0;

// constants for game play
var TIME_INTERVAL = 5; // screen refresh interval in milliseconds
var ENEMY_SPEED = 0.05; // Enemy speed multiplier
var FRIENDLY_SPEED = 35; // Friendly speed multiplier
var FRIENDLY_FIRE_SPEED = 0.5;
var EnemyFireSpeed = 0.5;
var EnemyFireCount = 1;
var EnemyFireARR;

var FIRE_COUNT=3;
// variables for the game loop and tracking statistics
var intervalTimer; // holds interval timer
var timerCount = 0; // number of times the timer fired since the last second
var timeLeft; // the amount of time left in seconds
var newTime;
var shotsFired; // the number of shots the user has fired
var timeElapsed; // the number of seconds elapsed
var speedTime;
var times = 4;
var times2 = 4;
var flag = true;


var canvasWidth; // width of the canvas
var canvasHeight; // height of the canvas


let timelimit = 2; // Set initial value of timelimit to 2

document.getElementById("timelimit").addEventListener("input", function() {
  timelimit = parseInt(this.value); // Update timelimit whenever the input value changes
});
// const timelimitInput = document.getElementById("timelimit");
// const timelimit = parseInt(timelimitInput.value);


function SpaceShip(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = new Image();
  this.image.src = "items/ship.png";
}

function FriendlySpaceShip(x, y, width, height) {
  this.numlife = 3;
  this.FIRE_ARR = [];
  this.FireNum = 0;
  SpaceShip.call(this, x, y, width, height);


  this.draw = function(){
    player = new Image();
    player.src = "/items/newPlayer.png";
    context.drawImage(player, this.x, this.y, 80,130);
    for(var i=0;i<this.FireNum;i++){
          this.FIRE_ARR[i].draw();
        }
  };
  // this.draw = function () {
  //   context.fillStyle = "green";
  //   context.beginPath();
  //   playerX = this.x;
  //   playerY = this.y;
  //   context.arc(
  //     this.x + width / 2,
  //     this.y + height / 2,
  //     this.width / 10,
  //     0,
  //     2 * Math.PI,
  //     false
  //   );
  //   context.fill();
  //   for(var i=0;i<this.FireNum;i++){
  //     this.FIRE_ARR[i].draw();
  //   }
  // };
  this.moveDown = function () {
    this.y = Math.min(this.y + FRIENDLY_SPEED, floorY);
  };
  this.moveUp = function () {
    this.y = Math.max(this.y - FRIENDLY_SPEED, topY);
  };
  this.moveLeft = function () {
    this.x = Math.max(this.x - FRIENDLY_SPEED, 0);
  };
  this.moveRight = function () {
    this.x = Math.min(this.x + FRIENDLY_SPEED, canvasWidth * 0.9);
  };
  this.fire = function () {
    FIRE_COUNT--;
    this.FIRE_ARR.push(new FriendlyFire(this.x, this.y, this.width, this.height));
    this.FireNum++;  
  };
  this.moveFiers = function () {
    for(var i=0;i<this.FireNum;i++){
      this.FIRE_ARR[i].move();
    }
  };
}

function EnemySpaceShip(x, y, width, height) {
  this.isAlive = true;
  SpaceShip.call(this, x, y, width, height);
  this.draw = function () {
    if(this.isAlive==false){
      return;
    }
    enemy = new Image();
    enemy.src = "/items/enemy.png";
    context.drawImage(enemy, this.x, this.y, 80,100);
  };
  // this.draw = function () {
  //   if(this.isAlive==false){
  //     return;
  //   }
  //   context.fillStyle = "red";
  //   context.beginPath();

  //   context.arc(
  //     this.x + width / 2,
  //     this.y + height / 2,
  //     this.width / 10,
  //     0,
  //     2 * Math.PI,
  //     false
  //   );
  //   context.fill();
  // };
  
  this.move = function () {
    if (times2>0 && speedTime - 5 == timeLeft){
      times2--;
      EnemyFireSpeed+= 0.1;
      // speedTime-=5;
    }
    if (EnemyMove == "right") {
      this.x = Math.min(this.x + ENEMY_SPEED, canvasWidth * 0.9);
    } else if (EnemyMove == "left") {
      this.x = Math.max(this.x - ENEMY_SPEED, 0);
    }
  };
}

function FriendlyFire(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw = function () {
    if(this.y<=-10){
      friendly_ship.FIRE_ARR=friendly_ship.FIRE_ARR.filter((item)=>item!=this);
          friendly_ship.FireNum--;
          FIRE_COUNT++;
    }
    if(this.isAlive==false)return;
    playerFire = new image();
    playerFire.src = "/items/playerFire.png";
    context.drawImage(playerFire,this.x, this.y, width, height);
    // context.fillStyle = "yellow";
    // context.beginPath();
    // context.arc(
    //   this.x + width / 2,
    //   this.y + height / 2,
    //   this.width / 10,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // context.fill();

    for (let i = 0; i < NumRows; i++) {
      for (let j = 0; j < NumCols; j++) { 
        if(enemy_ships[i][j].isAlive && Math.abs(enemy_ships[i][j].x-this.x)<10&&Math.abs(enemy_ships[i][j].y-this.y-10)<=10){
          enemy_ships[i][j].isAlive=false;
          friendly_ship.FIRE_ARR=friendly_ship.FIRE_ARR.filter((item)=>item!=this);
          friendly_ship.FireNum--;
          FIRE_COUNT++;
          SCORE+=5*(4-i);
          document.getElementById("Score").innerHTML="Score:"+SCORE;
        } 
        
      }
    }

  };
  this.move = function () {
      this.y=Math.max(this.y-FRIENDLY_FIRE_SPEED,-100);
  };
}


function EnemyFire(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.final=false;
  this.draw = function () {
    if(Math.abs(friendly_ship.x-this.x)<=10&&Math.abs(friendly_ship.y - this.y + this.height)<=0){
      
      if (playerHp==0){
        friendly_ship.FIRE_ARR=friendly_ship.FIRE_ARR.filter((item)=>item!=this);
        endGame();

      }
      else{
        playerHp -= 1;
        friendly_ship.FIRE_ARR=friendly_ship.FIRE_ARR.filter((item)=>item!=this);
      }
    }
    context.fillStyle = "black";
    context.beginPath();
    enemyFireX = this.x;
    enemyFireY = this.y;
    context.arc(
      this.x + width / 2,
      this.y + height / 2,
      this.width / 10,
      0,
      2 * Math.PI,
      false
    );
    context.fill();
  };
  this.move = function () {
    if (times>0 && speedTime - 5 == timeLeft){
      times--;
      ENEMY_SPEED += 0.05;
      speedTime-=5;
    }
      this.y=Math.min(this.y+EnemyFireSpeed,canvasHeight+100);
  };
}


// called when the app first launches
function setupGame() {
  //menu buttons
  document.getElementById("Home_menu").addEventListener("click", goHome);
  document.getElementById("About_menu").addEventListener("click", goAbout);
  // document
  //   .getElementById("Configuration_menu")
  //   .addEventListener("click", goConfiguration);

  document.getElementById("Login_menu").addEventListener("click", goLogin);
  document.getElementById("SignUp_menu").addEventListener("click", goSignUp);

  //loginpress
  document.getElementById("Login_btn").addEventListener("click", goLogin);
  document.getElementById("SignUp_btn").addEventListener("click", goSignUp);

  document.getElementById("SubmitLogin").addEventListener("click", submitLogin);
  document.getElementById("SubmitSignUp")
    .addEventListener("click", submitSignUp);
  document.getElementById("submitplay").addEventListener("click", gameSettings);

  document.getElementById("startButton").addEventListener("click", newGame);
  document.getElementById("stopButton").addEventListener("click", stopGame);

  document.getElementById("previousButton").addEventListener("click", restartGame);

  document.addEventListener("keydown", function (event) {
    keyDownHandler(event);
  });

  inGame = false;
  EnemyMove = "right";
  change_direction = false;

  // get the canvas and context
  canvas = document.getElementById("theCanvas");
  context = canvas.getContext("2d");
  canvas.width = "1366";
  canvas.height = "768";
} // end function setupGame

// set up interval timer to update game
function startTimer() {
  intervalTimer = window.setInterval(updatePositions, TIME_INTERVAL);

} // end function startTimer

// terminate interval timer
function stopTimer() {
  window.clearInterval(intervalTimer);
} // end function stopTimer



// called by function newGame to scale the size of the game elements
// relative to the size of the canvas before the game begins
function resetElements() {
  times = 4;
  times2 = 4;
  EnemyFireSpeed = 0.5;
  ENEMY_SPEED = 0.05;
  speedTime = newTime;
  timeLeft = newTime;
  window.clearInterval( intervalTimer );
  playerHp = 3;
  canvas.style.display="flex";
  FIRE_COUNT=30;
  SCORE=0;
  EnemyFireCount=1;
  EnemyFireARR=[];
  let w = canvas.width;
  let h = canvas.height;
  floorY = h * 0.8;
  topY = h * 0.6;
  canvasWidth = w;
  canvasHeight = h;
  flag = true;
  
  document.getElementById("Score").style.display="flex";
  document.getElementById("Score").innerHTML="Score:"+SCORE;


  document.getElementById("playerhp").style.display="flex";
  document.getElementById("playerhp").innerHTML= "Player HP: " +playerHp;

  document.getElementById("timer").style.display="flex";
  document.getElementById("timer").innerHTML= "Time left: " +timeLeft;


  friendly_ship = new FriendlySpaceShip(
    WidthDistanceFactor * Math.random() * canvasWidth,
    floorY,
    50,
    50
  );
  enemy_ships = Array(NumRows)
    .fill()
    .map(() => Array(NumCols));
  for (let i = 0; i < NumRows; i++) {
    for (let j = 0; j < NumCols; j++) {
      enemy_ships[i][j] = new EnemySpaceShip(
        j * ((canvasWidth * WidthDistanceFactor) / NumCols),
        i * (canvasHeight / NumRows) * HeightEnemy,
        (canvasWidth * WidthDistanceFactor) / NumCols,
        (canvasHeight * HeightEnemy) / NumRows
      );
    }
  }
} // end function resetElements

// reset all the screen elements and start a new game
function newGame() {
  // background = new image();
  // background.src = "items/background.png"
  
  // set up the game
  timeLeft = newTime;
  //speedTime = newTime;
  intervalTimer = window.setInterval( updatePositions, TIME_INTERVAL );
  resetElements();
  stopTimer();
  inGame = true;

  startTimer();
} // end function newGame
function stopGame() {
  // set up the game

  stopTimer();
  document.getElementById("Score").style.display="none";
  document.getElementById("playerhp").style.display="none";
  document.getElementById("timer").style.display="none";
  window.clearInterval( intervalTimer );
  inGame = false;
  if(canvas!=undefined){
    canvas.style.display="none";
  }
} // end function newGame

// called every TIME_INTERVAL milliseconds
function updatePositions() {
  if ((playerHp == 0 || SCORE == 250)&& flag==true){
    flag = false;
    endGame();
  }
  if (inGame == false){
    document.getElementById("Score").style.display="none";
    document.getElementById("playerhp").style.display="none";
    document.getElementById("timer").style.display="none";
  }
  moveEnemyShips();
  friendly_ship.moveFiers()
  enemy_fire();
    ++timerCount; // increment the timer event counter

   // if one second has passed
   if (TIME_INTERVAL * timerCount >= 1000)
   {
      --timeLeft; // decrement the timer
      ++timeElapsed; // increment the time elapsed
      timerCount = 0; // reset the count
   } // end if

   draw(); // draw all elements at updated positions
   // if the timer reached zero
   if (timeLeft <= 0)
   {
      stopTimer();
      stopGame();
      timeLeft = newTime;
      showGameOverDialog("Times up"); // show the losing dialog
   }
};


function enemy_fire() {
  let x_rand=Math.floor(Math.random()*NumCols);
  let y_rand=Math.floor(Math.random()*NumRows);
  for(let i=0;i<NumRows;i++){
    for(let j=0;j<NumCols;j++){
      if(i==y_rand&&j==x_rand){
        if(enemy_ships[i][j].isAlive==true){
          if(EnemyFireCount>0){
            EnemyFireCount--;
            EnemyFireARR.push(new EnemyFire(enemy_ships[i][j].x+enemy_ships[i][j].width/2,enemy_ships[i][j].y+enemy_ships[i][j].height,enemy_ships[i][j].width,enemy_ships[i][j].height));
          }
        }
      }
      
    }
  }
  if(EnemyFireARR.length==1&&EnemyFireARR[0].y>0.7*canvasHeight){
    EnemyFireCount++;
  }
  for(let i=0;i<EnemyFireARR.length;i++){
    if(EnemyFireARR[i].y-30>canvasHeight){
      EnemyFireARR=EnemyFireARR.filter((item)=>item!=EnemyFireARR[i]);
    }
  }
};

// draws the game elements to the given Canvas
function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  canvas.width = canvas.width; // clears the canvas (from W3C docs)

  friendly_ship.draw();
  for (let i = 0; i < NumRows; i++) {
    for (let j = 0; j < NumCols; j++) {
      enemy_ships[i][j].draw();
    }
  }
  for(let i=0;i<EnemyFireARR.length;i++){
    EnemyFireARR[i].move();
    EnemyFireARR[i].draw();
  }

  // document.getElementById("playerhp").style.display="flex";
  // document.getElementById("playerhp").innerHTML= "Player HP: " +playerHp;

  // document.getElementById("timer").style.display="flex";
  // document.getElementById("timer").innerHTML= "Time left: " +timeLeft;


} // end function draw

// display an alert when the game ends by end of time
function showGameOverDialog(message)
{
  let username = document.getElementById("Login_username").value;
  if (SCORE< 100){

    alert("You can do better");
    if (username != null){
      addScore(users[username].firstname, SCORE);
    }
    else{
      addScore(user1.firstname, SCORE);
    }
  }
  else{
    alert("Winner");
    if (username != null){
      addScore(users[username].firstname, SCORE);
    }
    else{
      addScore(user1.firstname, SCORE);
    }
  }
} // end function showGameOverDialog // end function showGameOverDialog

// const scoreTable = document.getElementById("scoreTable");

let scores = []; // Array to store the game scores

function addScore(game, score) {
  stopTimer();
  document.getElementById("Score").style.display="none";
  document.getElementById("playerhp").style.display="none";
  document.getElementById("timer").style.display="none";
  // document.getElementById("Configuration").style.display = "none";
  window.clearInterval( intervalTimer );
  inGame = false;
  if(canvas!=undefined){
    canvas.style.display="none";
  }
  muteDivs();
  scores.push({ game, score }); // Add game and score as an object to the scores array
  updateScoreboard(game,score);
  document.getElementById("scoreboard").style.display="flex";
}



    
  function updateScoreboard() {
    // Sort the scores array in descending order based on score values
    scores.sort((a, b) => b.score - a.score);

    // Get a reference to the HTML table element
    const scoreTable = document.getElementById("scoreTable");

    // Clear the existing rows in the score table
    while (scoreTable.rows.length > 1) {
      scoreTable.deleteRow(1);
    }

    // Add the sorted scores to the score table
    scores.forEach((score) => {
      const newRow = scoreTable.insertRow();
      const gameCell = newRow.insertCell();
      const scoreCell = newRow.insertCell();
      gameCell.textContent = score.game;
      scoreCell.textContent = score.score;
    });
  }

  function restartGame(){
    stopTimer();
    document.getElementById("Score").style.display="none";
    document.getElementById("playerhp").style.display="none";
    document.getElementById("timer").style.display="none";
    window.clearInterval( intervalTimer );
    inGame = false;
    if(canvas!=undefined){
      canvas.style.display="none";
    }
    LoadGame();
  }

function goLogin() {
  muteDivs();
  document.getElementById("Login").style.display = "flex";
}
function goSignUp() {
  muteDivs();
  document.getElementById("SignUp").style.display = "flex";
}
function goHome() {
  muteDivs();
  document.getElementById("Welcome").style.display = "flex";
}
function goAbout() {
  document.querySelector("#About").showModal();
  document.getElementById("About").style.display = "flex";
  // document.getElementById("dialogClose").addEventListener("click", function () {
  //   document.getElementById("About").style.display = "none";
  //   document.getElementById("About").close();
  // });
  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      document.getElementById("About").style.display = "none";
    }
});
const dialog = document.getElementById('About');
  const dialogCloseButton = document.getElementById('dialogClose');

  // Add event listener to close the dialog when clicking outside of it
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      document.getElementById("About").style.display = "none";
      dialog.close();
    }
  });
  // Add event listener to close the dialog when clicking on the "X" button
  dialogCloseButton.addEventListener('click', () => {
    document.getElementById("About").style.display = "none";
    dialog.close();
  });

}
function goConfiguration() {
  muteDivs();
  document.getElementById("Configuration").style.display = "flex";
}
function showScore(){
  muteDivs();
  document.getElementById("scoreboard").style.display="block";
}


function gameSettings(timelimitt, shoot){  
  // var shootingKeyCode = document.getElementById("shootlabel").innerHTML;
  event.preventDefault();
  FIRE_KEY = 32;
  timeLeft = timelimit * 60;
  newTime = timelimit * 60;
  // event.stopPropagation();
  intervalTimer = window.setInterval( updatePositions, TIME_INTERVAL );
  resetElements();
  stopTimer();
  muteDivs();
  LoadGame();
  timeLeft = timelimit * 60;
  return false;
}

function LoadGame() {
  muteDivs();
  // document.getElementById("Login").style.display = "none";
  // document.getElementById("SignUp").style.display = "none";
  // document.getElementById("Welcome").style.display = "none";
  // document.getElementById("Configuration").style.display = "none";

  document.getElementById("Game").style.display = "block";
  if (canvas!=undefined){
    canvas.style.display="none"
  }
  inGame = false;
}

function muteDivs() {
  document.getElementById("Game").style.display = "none";
  document.getElementById("Login").style.display = "none";
  document.getElementById("SignUp").style.display = "none";
  document.getElementById("Welcome").style.display = "none";
  document.getElementById("Configuration").style.display = "none";
  document.getElementById("scoreboard").style.display = "none";
}

function submitLogin() {
  let username = document.getElementById("Login_username").value;
  let password = document.getElementById("Login_password").value;
  if (users[username] == undefined) {
    alert("Username does not exist");
  } 
  else if (users[username].password != password) {
    alert("Incorrect Password");
  }
  else {
    event.preventDefault();
    goConfiguration();
  }
}
function submitSignUp() {
  let username = document.getElementById("SignUp_username").value;
  let password = document.getElementById("SignUp_password").value;
  let confirmPassword = document.getElementById("SignUp_confirmPassword").value;
  let email = document.getElementById("SignUp_email").value;
  let birthday = document.getElementById("SignUp_birthday").value;
  let firstname = document.getElementById("SignUp_firstname").value;
  let lastname = document.getElementById("SignUp_lastname").value;

  if (
    checkSetUp(username, password, email, firstname, lastname, confirmPassword)
  ) {
    users[username] = {
      password: password,
      email: email,
      birthday: birthday,
      firstname: firstname,
      lastname: lastname,
    };
     muteDivs();
    // LoadGame();
    goHome();
  }
}

function checkSetUp(
  username,
  password,
  email,
  firstname,
  lastname,
  confirmPassword
) {
  // check if password includes numbers and letters (at least 8 characters)

  if (users[username] != undefined) {
    alert("Username already exist");
    return false;
  }
  const passwordRegex = /^([A-Za-z0-9]){8,}$/;
  if (!password.match(passwordRegex)) {
    alert(
      "Password must include at least 8 characters with numbers and letters." +
        password
    );
    return false;
  }

  // check if first name and last name do not include numbers
  const nameRegex = /^[A-Za-z]+$/;
  if (!firstname.match(nameRegex) || !lastname.match(nameRegex)) {
    alert(
      "First name and last name must not include numbers." +
        firstname +
        " " +
        lastname
    );
    return false;
  }

  // check if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email.match(emailRegex)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // check if password fields match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }
  return true;
}

function keyDownHandler(event) {
  if (inGame) {
    switch (event.keyCode) {
      case LEFT_KEY: // left arrow
        friendly_ship.moveLeft();
        break;
      case RIGHT_KEY: // right arrow
        friendly_ship.moveRight();
        break;
      case UP_KEY: // up arrow
        friendly_ship.moveUp();
        break;
      case DOWN_KEY: // down arrow
        friendly_ship.moveDown();
        break;
      case FIRE_KEY: // space bar
        if(FIRE_COUNT>0){
          
          friendly_ship.fire();
        }
        break;
    }
  }
}
function moveEnemyShips() {
  if (
    EnemyMove == "right" &&
    enemy_ships[0][NumCols - 1].x + enemy_ships[0][NumCols - 1].width >=
      canvasWidth
  ) {
    EnemyMove = "left";
  } else if (EnemyMove == "left" && enemy_ships[0][0].x <= 0) {
    EnemyMove = "right";
  }
  for (let i = 0; i < NumRows; i++) {
    for (let j = 0; j < NumCols; j++) {
      enemy_ships[i][j].move();
    }
  }
}

function endGame(){
  let username = document.getElementById("Login_username").value;
  if (SCORE == 250){
    alert("Champion");
    if (username != null){
      addScore(users[username].firstname, SCORE);
    }
    else{
      addScore(user1.firstname, SCORE);
    }
  }
  else if (playerHp == 0)
  {
    alert("You Lost");
    if (username != null){
      addScore(users[username].firstname, SCORE);
    }
    else{
      addScore(user1.firstname, SCORE);
    }
  }
  return;
};
window.addEventListener("load", setupGame, false);
