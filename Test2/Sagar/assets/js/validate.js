const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (validateName() && validateEmail() && validatePassword()) {
    alert("Registered Succesfully");
  }
});

function validateName() {
  let name = document.getElementById("name").value;

  if (name.length == 0) {
    nameError.innerHTML = "Name is required!";
    nameError.style.color = "red";

    return false;
  }

  nameError.innerHTML = "";

  return true;
}

function validateEmail() {
  let email = document.getElementById("email").value;

  if (email.length == 0) {
    emailError.innerHTML = "Email is required!";
    emailError.style.color = "red";

    return false;
  }

  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    emailError.innerHTML = "Enter Valid Email!";
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
    passError.innerHTML = "Password is required!";
    passError.style.color = "red";

    return false;
  }

  passError.innerHTML = " ";

  return true;
}
