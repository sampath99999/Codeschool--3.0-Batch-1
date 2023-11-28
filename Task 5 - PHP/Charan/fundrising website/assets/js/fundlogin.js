if (localStorage.getItem("token")) {
  location.href = "./dashboard.html";
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
    url: "./api/fundlogin.php",
    method: "POST",
    data: {
      email,
      password,
    },
    success: (response) => {
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
}
