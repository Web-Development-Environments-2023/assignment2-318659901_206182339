// var users = [
// {username: "p", password:"testuser"}
// ]; // create an array of users.

var users = JSON.parse(localStorage.getItem("users")) || [{username:"p",password:"testuser"}];

// Menu Buttons
function registerButton(){
    window.location.href = "registration.html";
}

function logInButton()
{
  window.location.href = "logIn.html";
}

function signIn(){
  var username = document.getElementById("usernamelog").value;
    var password = document.getElementById("passwordlog").value;

    // loop through the array of registered users to check if the username and password match
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          window.location.href = "game.html";
          return;
        }
    }

    // if no match is found, display an error message
    alert("Incorrect username or password.");
    }

//registration
// function saveUser() {
//     // Retrieve the form data
//     var firstname = document.getElementById("firstname").value;
//     var lastname = document.getElementById("lastname").value;
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     var confirmpassword = document.getElementById("confirmpassword").value;
//     var email = document.getElementById("email").value;
//     var dob = document.getElementById("dob").value;
  
//     // Validate the data
//     if (firstname == "") {
//       alert("Please enter your first name");
//       return false;
//     }
    
//     if (lastname == "") {
//       alert("Please enter your last name");
//       return false;
//     }
    
//     if (username == "") {
//       alert("Please enter a username");
//       return false;
//     }
  
//     if (password == "") {
//       alert("Please enter a password");
//       return false;
//     }
  
//     if (confirmpassword == "") {
//       alert("Please confirm your password");
//       return false;
//     }
  
//     if (password != confirmpassword) {
//       alert("The password and confirmation password do not match");
//       return false;
//     }
    
//     if (email == "") {
//       alert("Please enter your email address");
//       return false;
//     }
  
//     if (dob == "") {
//       alert("Please enter your date of birth");
//       return false;
//     }
//     // Check if the passwords match
//     if (password != confirmPassword) {
//         alert("Passwords do not match!");
//         return;
//     }
//     // TODO: Validate the data
  
//     // Send the data to the server
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         // Handle the server response
//         alert(this.responseText);
//       }
//     };
//     xhttp.open("POST", "saveUser.php", true);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send("username=" + username + "&password=" + password + "&email=" + email + "&dob=" + dob);
//   }


	function saveUser() {
     // Retrieve the form data
     var firstname = document.getElementById("firstname").value;
     var lastname = document.getElementById("lastname").value;
     var username = document.getElementById("username").value;
     var password = document.getElementById("password").value;
     var confirmpassword = document.getElementById("confirmpassword").value;
     var email = document.getElementById("email").value;
     var dob = document.getElementById("dob").value;
   
     // Validate the data
     if (firstname == "") {
       alert("Please enter your first name");
       return false;
     }
     
     if (lastname == "") {
       alert("Please enter your last name");
       return false;
     }
     
     if (username == "") {
       alert("Please enter a username");
       return false;
     }
   
     if (password == "") {
       alert("Please enter a password");
       return false;
     }
   
     if (confirmpassword == "") {
       alert("Please confirm your password");
       return false;
     }
   
     if (password != confirmpassword) {
       alert("The password and confirmation password do not match");
       return false;
     }
     
     if (email == "") {
       alert("Please enter your email address");
       return false;
     }
   
     if (dob == "") {
       alert("Please enter your date of birth");
       return false;
     }
     
     // Create a new user object with the data
     var user = {
         firstname: firstname,
         lastname: lastname,
         username: username,
         password: password,
         email: email,
         dob: dob
     };
     
     // Add the user object to the array
     users.push(user);
 
     // Store the updated array of users in localStorage
     localStorage.setItem("users", JSON.stringify(users));
     
     alert("User registered successfully!");
     console.log(users);
				}

    function goToMainPage() {
      window.location.href = "index.html"; // replace "mainPage.htm
    }

  
  