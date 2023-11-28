// if (localStorage.getItem("token")) {
//   location.href = "./admin_dashboard.html";
// }

function admin_login() {
  let email = $("#email").val();
  let password = $("#password").val();

  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/admin.php",
    method: "POST",
    data: {
      email,
      password,
    },
    success: (response) => {
      try {
        var jsonData = JSON.parse(response);
        // Your code using the parsed JSON data
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    },
    //   console.log("in api");
    //   console.log(response);
    //   response = JSON.parse(response);

    // if (response.status != "success") {
    //   alert("nothing");
    //   }
    //   localStorage.setItem("token", response.data.token);
    //   location.href = "./admin_dashboard.html";
    // } catch (e) {
    //   console.error("Error parsing JSON:e);
    // }

    error: (response) => {
      console.log(response);
    },
  });
}
