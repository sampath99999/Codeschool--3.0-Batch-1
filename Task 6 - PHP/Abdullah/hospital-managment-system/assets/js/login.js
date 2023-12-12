function validatePassword() {
    var password = $(".password").val();
    var validationMessagepwd = $("#validationMessagepwd");
    if (password.length < 7) {
      validationMessagepwd.html("Password must be at least 8 characters.");
      return false;
    } else {
      validationMessagepwd.html("");
      return true;
    }
}

function validateMail() {
    var email = $(".email").val();
    var regex = /^\S+@\S+\.\S+$/;
    var validationMessageemail = $("#validationMessageemail");
    if (!regex.test(email)) {
      validationMessageemail.html("Invalid email format.");
      return false;
    } else {
      validationMessageemail.html("");
      return true;
    }
}

function login() {
  try {
    var email = $(".email").val();
    var password = $(".password").val();
    var loginAs = $("input[name='loginAs']:checked").val();

    console.log(loginAs);

      if (email === "" || password === "") {
        alert("Please enter both email and password");
        return;
      }

      if (!validateMail() || !validatePassword()) {
        throw new Error("Enter a valid email and password");
      }
      if (loginAs == "user") {

      console.log("before call");
      console.log(email);
      console.log(password);
      $.post("http://localhost:3000/api/login.php", {
        email: email,
        password: password,
      }).then(function (res) {
        console.log("after call");

        var resData = JSON.parse(res);
        console.log(resData);

        if (resData.status == false || resData.status == "false") {
          location.href = "./login.html";
          console.log("inside false status");
        }

        if (resData.status) {
          swal({
            title: "Login Successful",
            text: "",
            icon: "success",
            button: "OK",
          }).then(function () {
            localStorage.setItem("token", resData.data.token);
            localStorage.setItem("id", resData.data.user_id);
            location.href = "./home.html";
          });
        } else {
          swal({
            title: "Invalid Credentials",
            text: "",
            icon: "warning",
            button: "OK",
          });
        }
      });
    }
    if (loginAs == "admin") {

      console.log("before call");
      $.post("http://localhost:3000/api/adminLogin.php", {
        email: email,
        password: password,
      }).then(function (res) {
        console.log("after call");

        var resData = JSON.parse(res);
        console.log(resData);

        if (resData.status == false || resData.status == "false") {
          location.href = "./login.html";
          console.log("inside false status");
        }

        if (resData.status == true || resData.status == "true") {
          swal({
            title: "Login Successful",
            text: "Admin Dashboard",
            icon: "success",
            button: "OK",
          }).then(function () {
            localStorage.setItem("token", resData.data.token);
            localStorage.setItem("id", resData.data.admin_id);
            localStorage.setItem("adminName", resData.data.admin_name);
            location.href = "./dashboard.html";
          });
        } else {
          swal({
            title: "Invalid Credentials",
            text: "",
            icon: "warning",
            button: "OK",
          });
        }
      });

    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}
