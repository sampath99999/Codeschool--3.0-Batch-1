$("#registrationSubmitBtn").click(function () {
  var name = $("#registrationName").val();
  var email = $("#registrationEmail").val();
  var phoneNo = $("#registrationPhoneNo").val();
  var password = $("#registrationPassword").val();

  if (!validateEmail(email)) {
    console.log("Enter a valid email");
  }

  if (!validatePassword(password)) {
    console.log("Enter a valid password");
  }

  if (name.length < 4 || name.length > 15) {
    console.log("Enter a valid name");
  }
  $.post("http://localhost:3000/api/user/register.php", {
    email: email,
    password: password,
    name: name,
    phoneNo: phoneNo,
  }).then(function (res) {
    console.log(res);
    var resData = JSON.parse(res);
    console.log(res);
    if (res.status == true || res.status == "true") {
        console.log("should have been redirected to login page");
      window.location.href = "http://localhost:3000/userLogin.html";
    } else {
      console.log("Registration failed");
    }
  });
});
function validatePassword(password) {
  if (password.length < 8) {
    console.log("Password should be at least 8 characters");
    return false;
  } else {
    console.log("Password is valid");
    return true;
  }
}

const validateEmail = (email) => {
  console.log("email: " + email);
  console.log("email length: " + email.length);
  if (!email ) {
    return false;
  } else {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};
