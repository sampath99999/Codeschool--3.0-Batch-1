if (localStorage.getItem("token")) {
  location.href = "./dashboard.html";
}
function register() {
  let name = $("#name").val();
  let email = $("#email").val();
  let mobile = $("#mobile").val();
  let password = $("#password").val();

  $.ajax({
    url: "./api/fundregister.php",
    method: "POST",
    data: {
      name,
      mobile,
      email,
      password,
    },
    success: (response) => {
      response = JSON.parse(response);
      if (!response.status) {
        alert(response.message);
        return false;
      }
      location.href = "./fundlogin.html";
    },
    error: (response) => {
      console.log(response);
    },
  });
}
