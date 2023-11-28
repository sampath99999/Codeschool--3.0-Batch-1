$(document).ready(function () {
  // alert("Hey  Im kanna");
  getTheaters();
});

function getTheaters() {
  console.log("calling api");
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/getTheaters.php",
    method: "GET",
    success: function (response) {
      $("#theatertable").html(response);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}
function addTheater() {
  let name = $("#theaterName").val();
  let address = $("#address").val();

  console.log(name);
  console.log(address);
  $("#para").html("<a href=#> Yeah its working</a>");
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/addTheater.php",
    method: "POST",
    data: {
      name,
      address,
    },
    success: (response) => {
      console.log(response);
      $("#show_alert").html(
        `<div class="alert alert-success" role="alert">${response}</div>`
      );
      getTheaters();
    },
    error: (response) => {
      console.log(response);
    },
  });
}
// type: "DELETE",
// dataType: "json",
function deleteTheater(theaterid) {
  let id = theaterid;
  console.log(id);
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/deleteTheater.php",
    method: "POST",

    data: {
      id,
    },
    success: function (response) {
      console.log(response);
      $("#show_alert").html(
        `<div class="alert alert-success" role="alert">${response}</div>`
      );
      getTheaters();
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}
// // response = JSON.parse(response);
// if (!response.status) {
//   // alert(response.message);
//   Swal.fire({
//     title: "Error!",
//     text: response.message,
//     icon: "error",
//   });

//   return false;
// }

// Swal.fire({
//   title: "Good job!",
//   text: response.message,
//   icon: "success",
// });
