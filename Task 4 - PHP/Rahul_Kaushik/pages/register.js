if (localStorage.getItem("token")) {
  location.href = "../index.html";
}

const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

usernameInput.addEventListener("input", () => {
  console.log("i am in user validation");
  if (!validateUsername(usernameInput.value)) {
    usernameError.textContent = "Username must have 8 characters";
    usernameInput.classList.add("is-invalid");
  } else {
    usernameError.textContent = "";
    usernameInput.classList.replace("is-invalid","is-valid");
  }
});

function validateUsername(username) {
  return username.length >= 5;
}

emailInput.addEventListener("input", () => {
  console.log("i am in email validation");
  if (!validateEmail(emailInput.value)) {
    emailError.textContent = "Invalid email address";
    emailInput.classList.add("is-invalid");
  } else {
    emailError.textContent = "";
    emailInput.classList.replace("is-invalid","is-valid");
  }
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(email);
}

passwordInput.addEventListener("input", () => {
  console.log("i am in password validation");
  if (!validatePassword(passwordInput.value)) {
    passwordError.innerHTML =
      "<p>Password must have:<br>more than 8 letters<br>both uppercase or lowercase<br>atleast one digit<br>atleast one special character</p>";
      passwordInput.classList.add("is-invalid");
  } else {
    passwordError.textContent = "";
    passwordInput.classList.replace("is-invalid","is-valid");
  }
});

function validatePassword(password) {
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}/;
  return passwordRegex.test(password);
}


$(document).ready(() => {
  
  $("#submit").click(() => {
      console.log("i am clicked");
      window.location.href = "../index.html";
  });
});