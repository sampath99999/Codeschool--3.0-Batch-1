if (localStorage.getItem("token")) {
  location.href = "./dashboard.html";
}
function register() {
  let name = $("#name").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let mobile = $("#mobile").val();

  $.ajax({
    url: "./api/register.php",
    method: "POST",
    data: {
      name,
      email,
      password,
      mobile,
    },
    success: (response) => {
      response = JSON.parse(response);
      if (!response.status) {
        alert(response.message);
        return false;
      }
      location.href = "login.html";
    },
    error: (response) => {
      console.log(response);
    },
  });
}
