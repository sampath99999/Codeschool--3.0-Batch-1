if (localStorage.getItem("token")) {
  const user_type = localStorage.getItem("user_type");

  if (user_type == 0) {
    location.href = "./admin.html";
  } else {
    location.href = "./user.html";
  }
}

let params = new URLSearchParams(location.search);
if (params.get("error")) {
  alert(params.get("error"));
  window.history.replaceState(null, "", window.location.pathname);
}

function login() {
  let email = $("#email").val();
  let password = $("#password").val();

  $.ajax({
    url: "./api/login.php",
    method: "POST",
    data: {
      email,
      password,
    },
    success: (loginResponse) => {
      try {
        const loginData = JSON.parse(loginResponse);

        if (!loginData.status) {
          alert(loginData.message);
          return false;
        }

        localStorage.setItem("token", loginData.data.token);
        localStorage.setItem("user_type", loginData.data.user_type);

        if (loginData.data.user_type == 0) {
          location.href = "./admin.html";
        } else {
          location.href = "./user.html";
        }
      } catch (loginError) {
        console.error("Error parsing login JSON response: ", loginError);
      }
    },
    error: (loginError) => {
      console.log("Login AJAX request failed: ", loginError);
    },
  });
}
