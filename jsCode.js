// // var users = [
// // {username: "p", password:"testuser"}
// // ]; // create an array of users.

// var users = JSON.parse(localStorage.getItem("users")) || [{username:"p",password:"testuser"}];

// // Menu Buttons
// function registerButton(){
//     window.location.href = "registration.html";
// }

// function logInButton()
// {
//   window.location.href = "logIn.html";
// }

// function signIn(){
//   var username = document.getElementById("usernamelog").value;
//     var password = document.getElementById("passwordlog").value;

//     // loop through the array of registered users to check if the username and password match
//     for (var i = 0; i < users.length; i++) {
//         if (users[i].username === username && users[i].password === password) {
//           window.location.href = "game.html";
//           return;
//         }
//     }

//     // if no match is found, display an error message
//     alert("Incorrect username or password.");
//     }

//   // Get the modal element
// var modal = document.getElementById("about-modal");

// // Get the button that opens the modal
// var btn = document.getElementById("about-btn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   closeModal();
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     closeModal();
//   }
// }

// // When the user presses the escape key, close the modal
// document.onkeydown = function(event) {
//   event = event || window.event;
//   if (event.keyCode == 27) {
//     closeModal();
//   }
// }

// function closeModal() {
//   modal.style.display = "none";
// }


// //registration
// // function saveUser() {
// //     // Retrieve the form data
// //     var firstname = document.getElementById("firstname").value;
// //     var lastname = document.getElementById("lastname").value;
// //     var username = document.getElementById("username").value;
// //     var password = document.getElementById("password").value;
// //     var confirmpassword = document.getElementById("confirmpassword").value;
// //     var email = document.getElementById("email").value;
// //     var dob = document.getElementById("dob").value;
  
// //     // Validate the data
// //     if (firstname == "") {
// //       alert("Please enter your first name");
// //       return false;
// //     }
    
// //     if (lastname == "") {
// //       alert("Please enter your last name");
// //       return false;
// //     }
    
// //     if (username == "") {
// //       alert("Please enter a username");
// //       return false;
// //     }
  
// //     if (password == "") {
// //       alert("Please enter a password");
// //       return false;
// //     }
  
// //     if (confirmpassword == "") {
// //       alert("Please confirm your password");
// //       return false;
// //     }
  
// //     if (password != confirmpassword) {
// //       alert("The password and confirmation password do not match");
// //       return false;
// //     }
    
// //     if (email == "") {
// //       alert("Please enter your email address");
// //       return false;
// //     }
  
// //     if (dob == "") {
// //       alert("Please enter your date of birth");
// //       return false;
// //     }
// //     // Check if the passwords match
// //     if (password != confirmPassword) {
// //         alert("Passwords do not match!");
// //         return;
// //     }
// //     // TODO: Validate the data
  
// //     // Send the data to the server
// //     var xhttp = new XMLHttpRequest();
// //     xhttp.onreadystatechange = function() {
// //       if (this.readyState == 4 && this.status == 200) {
// //         // Handle the server response
// //         alert(this.responseText);
// //       }
// //     };
// //     xhttp.open("POST", "saveUser.php", true);
// //     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// //     xhttp.send("username=" + username + "&password=" + password + "&email=" + email + "&dob=" + dob);
// //   }


// 	function saveUser() {
//      // Retrieve the form data
//      var firstname = document.getElementById("firstname").value;
//      var lastname = document.getElementById("lastname").value;
//      var username = document.getElementById("username").value;
//      var password = document.getElementById("password").value;
//      var confirmpassword = document.getElementById("confirmpassword").value;
//      var email = document.getElementById("email").value;
//      var dob = document.getElementById("dob").value;
   
//      // Validate the data
//      if (firstname == "") {
//        alert("Please enter your first name");
//        return false;
//      }
     
//      if (lastname == "") {
//        alert("Please enter your last name");
//        return false;
//      }
     
//      if (username == "") {
//        alert("Please enter a username");
//        return false;
//      }
   
//      if (password == "") {
//        alert("Please enter a password");
//        return false;
//      }
   
//      if (confirmpassword == "") {
//        alert("Please confirm your password");
//        return false;
//      }
   
//      if (password != confirmpassword) {
//        alert("The password and confirmation password do not match");
//        return false;
//      }
     
//      if (email == "") {
//        alert("Please enter your email address");
//        return false;
//      }
   
//      if (dob == "") {
//        alert("Please enter your date of birth");
//        return false;
//      }
     
//      // Create a new user object with the data
//      var user = {
//          firstname: firstname,
//          lastname: lastname,
//          username: username,
//          password: password,
//          email: email,
//          dob: dob
//      };
     
//      // Add the user object to the array
//      users.push(user);
 
//      // Store the updated array of users in localStorage
//      localStorage.setItem("users", JSON.stringify(users));
     
//      alert("User registered successfully!");
//      console.log(users);
// 				}

//     function goToMainPage() {
//       window.location.href = "index.html"; // replace "mainPage.htm
//     }

  
var canvas; // the canvas
var context; // used for drawing on the canvas
var canvasWidth;
var canvasHeight;

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





  


// called when the app first launches
function setupGame() {
  //menu buttons
  document.getElementById("Home_menu").addEventListener("click", goHome);
  document.getElementById("About_menu").addEventListener("click", goAbout);
  document
    .getElementById("Configuration_menu")
    .addEventListener("click", goConfiguration);



  //loginpress
  document.getElementById("Login_btn").addEventListener("click", goLogin);
  document.getElementById("SignUp_btn").addEventListener("click", goSignUp);

  document.getElementById("submitLogin").addEventListener("click", submitLogin);
  document
    .getElementById("submitSignUp")
    .addEventListener("click", submitSignUp);

  document.getElementById("startButton").addEventListener("click", newGame);
  document.getElementById("stopButton").addEventListener("click", stopGame);

  document.addEventListener("keydown", function (event) {
    keyDownHandler(event);
  });



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
  document.getElementById("dialogOK").addEventListener("click", function () {
    document.getElementById("About").style.display = "none";
    document.getElementById("About").close();
  });
}
function goConfiguration() {}

function LoadGame() {
  muteDivs();
  document.getElementById("Game").style.display = "flex";
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
}

function submitLogin() {
  let username = document.getElementById("Login_username").value;
  let password = document.getElementById("Login_password").value;
  if (users[username] == undefined) {
    alert("Username does not exist");
  } else if (users[username].password != password) {
    alert("Incorrect Password");
  } else {
    muteDivs();
    LoadGame();
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
    LoadGame();
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


window.addEventListener("load", setupGame, false);