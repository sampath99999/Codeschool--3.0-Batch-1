function login() {
  let image = $("#image").val();
  let title = $("#title").val();
  let description = $("#description").val();

  // Do the validation

  $.ajax({
    url: "./api/blogpost.php",
    method: "POST",
    data: {
      image,
      title,
      description,
    },
    success: (response) => {
      response = JSON.parse(response);
      if (!response.status) {
        alert(response.message);
        return false;
      }
      location.href = "admin.html";
    },
    error: (response) => {
      console.log(response);
    },
  });
}
function logout() {
  location.href = "admin.html";
}
