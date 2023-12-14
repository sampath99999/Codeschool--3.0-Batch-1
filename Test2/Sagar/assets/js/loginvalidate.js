const emailError = document.getElementById("emailError");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (validateEmail() && validatePassword()) {
    alert("Login Successfully");
  }
});

function validateEmail() {
  let email = document.getElementById("email").value;

  if (email.length == 0) {
    emailError.innerHTML = "Email is required";
    emailError.style.color = "red";

    return false;
  }

  emailError.innerHTML = "";

  return true;
}

function validatePassword() {
  let password = document.getElementById("password").value;
  let passError = document.getElementById("passError");

  if (password.trim().length === 0) {
    passError.innerHTML = "Password is required";
    passError.style.color = 'red';

    return false;
  }

  passError.innerHTML = " ";

  return true;
}
