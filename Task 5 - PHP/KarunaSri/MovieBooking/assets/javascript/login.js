// let params = new URLSearchParams(location.search);
// if (params.get("error")) {
//   alert(params.get("error"));
//   window.history.replaceState(null, "", window.location.pathname);
// }
if (localStorage.getItem("token")) {
  location.href = "./dashboard.html";
}
function login() {
  let email = $("#email").val();
  let password = $("#password").val();
  console.log(email);

  // Do the validation

  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/login.php",
    method: "POST",
    data: {
      email,
      password,
    },
    success: (response) => {
      try {
        // console.log(response);
        response = JSON.parse(response);

        if (!response.status) {
          Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
          });
          return false;
        }
        Swal.fire({
          title: "Congrats!",
          text: response.message,
          icon: "success",
        });
        localStorage.setItem("token", response.data.token);
        location.href = "./dashboard.html";
      } catch (e) {
        console.error(e);
      }
    },
    error: (response) => {
      console.log(response);
    },
  });
}
