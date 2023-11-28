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
  if (email.length === 0 || email.length < 8) {
    return false;
  } else {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};

$("#adminLoginBtn").click(function () {
  var email = $("#adminEmail").val();
  var password = $("#adminPassword").val();
  console.log(email, password);
  if (!validateEmail(email)) {
    console.log("Enter a valid email");
  }
  if (!validatePassword(password)) {
    console.log("Enter a valid password");
  }

  $.post("http://localhost:3000/api/admin/login.php", {
    email: email,
    password: password,
  }).then(function (res) {
    console.log(res);
    var resData = JSON.parse(res);
    console.log("status:", resData.status);
    console.log(resData.data);
    console.log(resData.message);
    console.log("token:", resData.data.token);

    if (resData.status) {
      location.href = "/templates/adminDashboard.html";
      localStorage.setItem("token", resData.data.token);
    } else {
      alert("Invalid Credentials");
    }
  });
});
