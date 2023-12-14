if (!localStorage.getItem("token")) {
  location.href = "./login.html";
}

let params = new URLSearchParams(location.search);
if (params.get("error")) {
  alert(params.get("error"));
  window.history.replaceState(null, "", window.location.pathname);
}

if (validateEmail() && validatePwd()) {
  $.ajax({
    url: "http://localhost:3000/api/admin/login.php",
    method: "POST",
    data: {
      email,
      password,
    },
    success: (response) => {
      response = JSON.parse(response);
      response = JSON.parse(response);
      if (!response.status) {
        alert(response.message);
        return false;
      }
      localStorage.setItem("token", response.data.token);
      location.href = "./dashboard.html";
    },
    error: (response) => {
      console.log(response);
    },
  });
} else {
  window.location.href("../index.html");
}

function validatePwd() {
  var password = $("#password").val();
  var validationMessage4 = $("#validationMessage4");
  if (password.length < 8) {
    validationMessage4.html("Password must be at least 8 characters.");
    validationMessage4.css("color", "red");
    return false;
  } else {
    validationMessage4.html("");
    return true;
  }
}

function validateEmail() {
  var mail = $("#mail").val();
  var regex = /^\S+@\S+\.\S+$/;
  var validationMessage2 = $("#validationMessage2");
  if (!regex.test(mail)) {
    validationMessage2.html("Invalid email format.");
    validationMessage2.css("color", "red");
    return false;
  } else {
    validationMessage2.html("");
    return true;
  }
}
function login() {
  try {
    var email = $("#mail").val();
    var password = $("#password").val();

    if (!validateEmail(email)) {
      throw new Error("Enter a valid email");
    }
    if (!validatePassword(password)) {
      throw new Error("Enter a valid password");
    }

    if (validateEmail(email) && validatePassword(password)) {
      $.post("../api/login.php", { email: email, password: password }).then(
        function (res) {
          console.log(res);
          var resData = JSON.parse(res);
          console.log("status:", resData.status);
          console.log(resData.data);
          console.log(resData.message);
          console.log("token:", resData.data.token);

          if (resData.status) {
            location.href = "/templates/dashboard.html";
            localStorage.setItem("token", resData.data.token);
          } else {
            alert("Invalid Credentials");
          }
        }
      );
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}
