$(document).ready(function () {
  fetchMovie();
});

//Fetching Movies
function fetchMovie() {
  console.log("now fetching");
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/getmovie.php",
    type: "GET",
    success: function (response) {
      $("#tabledata").html(response);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}

//Delete movie
function deleteData(movieid) {
  console.log("Started deleting");
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/deletemovie.php",
    type: "POST",
    data: {
      movieid: movieid,
    },
    success: function (response) {
      console.log("COmplted deletion");
      $("#show_alert").html(
        `<div class="alert alert-success" role="alert">${response}</div>`
      );
      fetchMovie();
    },
  });
}

function addMovie() {
  let title = $("#title").val();
  let genre = $("#genre").val();
  let releasedate = $("#releasedate").val();
  let duration = $("#duration").val();

  $.ajax({
    type: "POST",
    url: "http://localhost/MOVIEBOOKING/api/addmovie.php",
    data: {
      title,
      genre,
      releasedate,
      duration,
    },
    success: function (response) {
      console.log("Stared adding");
      console.log(response);
      $("#show_alert").html(
        `<div class="alert alert-success" role="alert">${response}</div>`
      );
      fetchMovie();
      console.log("Complted adding");
    },
    error: function (error) {
      console.log("It is an error");
      console.error("AJAX Error:", error);
    },
  });
}
