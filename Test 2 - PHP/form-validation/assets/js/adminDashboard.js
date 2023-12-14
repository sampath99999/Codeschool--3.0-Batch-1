if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}
$.ajax({
  url: "./api/validation.php",
  method: "POST",
  data: {
    token: localStorage.getItem("token"),
  },
  success: function (response) {
    response = JSON.parse(response);
    $("#name").text(response.data.user.name);
  },
  error: function (response) {
    let data = JSON.parse(response.responseText);
    localStorage.removeItem("token");
    location.href = "login.html?error=" + data.message;
  },
});

function logout() {
  localStorage.clear();
  location.href = "login.html";
}
function addpost() {
  location.href = "adminpost.html";
}
