if (localStorage.getItem("token")) {
  location.href = "./dashboard.html";
}
function validateForm() {
  validateUsername();
  validateEmail();
  validatePhone();
  validatePassword();
  validateCPassword();
}
function register() {
  let username = $("#username").val();
  let email = $("#email").val();
  let phone = $("#phone").val();
  let password = $("#password").val();

  validateForm();

  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/register.php",
    method: "POST",
    data: {
      username,
      email,
      phone,
      password,
    },
    success: (response) => {
      response = JSON.parse(response);
      if (!response.status) {
        // alert(response.message);
        Swal.fire({
          title: "Error!",
          text: response.message,
          icon: "error",
        });

        return false;
      }

      Swal.fire({
        title: "Good job!",
        text: response.message,
        icon: "success",
      });
      location.href = "./login.html";
    },
    error: (response) => {
      console.log(response);
    },
  });
}

//Username Validations
function validateUsername() {
  var username = document.getElementById("username").value;
  var namestr = /^[A-Za-z]+$/;
  document.getElementById("usernameError").innerHTML = "";
  if (username === "") {
    document.getElementById("usernameError").innerHTML = "Username is required";
    return false;
  }
  if (username != "" && namestr.test(username) == false) {
    document.getElementById("usernameError").style.display = "block";
    document.getElementById("usernameError").innerHTML =
      "Name must be alphabets only";
    return false;
  } else {
    document.getElementById("usernameError").style.display = "none";
  }
}

//Email validations
function validateEmail() {
  var email = document.getElementById("email").value;
  document.getElementById("emailError").innerHTML = "";
  var str = /^[\w\+\'\.-]+@[\w\'\.-]+\.[a-zA-Z]{2,}$/;
  if (email === "") {
    document.getElementById("emailError").innerHTML = "Email is required";
    return false;
  }
  if (email != "" && str.test(email) == false) {
    document.getElementById("emailError").style.display = "block";
    document.getElementById("emailError").innerHTML = "Invalid Email id";
    return false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }
}
//Phone number validations

function validatePhone() {
  var phone = document.getElementById("phone").value;
  document.getElementById("phoneError").innerHTML = "";
  var num = /^(?!(\d)\1{9})(?!0123456789|1234567890|0987654321)\d{10}$/;
  if (phone != "" && num.test(phone) == false) {
    document.getElementById("phoneError").style.display = "block";
    document.getElementById("phoneError").innerHTML = "Invalid Phone number";
    return false;
  } else {
    document.getElementById("phoneError").style.display = "none";
  }
}
var password = document.getElementById("password").value;

//Password validations
function validatePassword() {
  let password = document.getElementById("password").value;

  document.getElementById("passwordError").innerHTML = "";
  var strongpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  if (password === "") {
    document.getElementById("passwordError").innerHTML = "Password is required";
    return false;
  }

  if (password != "" && strongpass.test(password) == false) {
    document.getElementById("passwordError").style.display = "block";
    document.getElementById("passwordError").innerHTML =
      "Password must contain: <br> At least 8 characters <br>At least 1 number<br> At least 1 lowercase character (a-z)<br> At least 1 uppercase character (A-Z)<br> At least 1 special character (! @ # $)";
    return false;
  } else {
    document.getElementById("passwordError").style.display = "none";
  }
}

//Confirm Password
function validateCPassword() {
  var password = document.getElementById("password");
  var cpassword = document.getElementById("cpassword");
  document.getElementById("cpasswordError").innerHTML = "";
  // if (cpassword === "") {
  //   document.getElementById("passwordError").innerHTML =
  //     "Confirm your Password";
  //   return false;
  // }
  // if (cpassword != "" || password != cpassword) {
  //   document.getElementById("cpasswordError").style.display = "block";
  //   document.getElementById("cpasswordError").innerHTML =
  //     "Password doesnot match";
  //   return false;
  // } else {
  //   document.getElementById("cpasswordError").style.display = "none";
  // }
  if (password.value == cpassword.value) {
    console.log("good");
    document.getElementById("cpasswordError").innerHTML = "Password  match";
  } else {
    console.log("bad");
    document.getElementById("cpasswordError").innerHTML =
      "Password doesnot match";
  }
}
