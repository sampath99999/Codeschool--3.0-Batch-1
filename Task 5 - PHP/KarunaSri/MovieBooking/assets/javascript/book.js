$(document).ready(function () {
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/bticket.php",
    method: "GET",
    success: function (response) {
      $("#t").html(response);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
});

function processticket() {
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/bprocessing.php",
    method: "POST",
    success: function (response) {
      $("#theatertable").html(response);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}
