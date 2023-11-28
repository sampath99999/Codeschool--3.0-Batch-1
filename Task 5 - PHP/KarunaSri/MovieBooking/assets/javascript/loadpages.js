function loadTheater() {
  $.ajax({
    url: "Theaters.html",
    type: "GET",
    success: function (data) {
      $("#loadedContent").html(data);
    },
    error: function () {
      console.error("Failed to load another page");
    },
  });
}
function loadBranch() {
  $.ajax({
    url: "TBranches.html",
    type: "GET",
    success: function (data) {
      $("#loadedContent").html(data);
    },
    error: function () {
      console.error("Failed to load another page");
    },
  });
}

function loadMovies() {
  $.ajax({
    url: "Movies.html",
    type: "GET",
    success: function (data) {
      $("#loadedContent").html(data);
    },
    error: function () {
      console.error("Failed to load another page");
    },
  });
}

function loadShows() {
  $.ajax({
    url: "Shows.html",
    type: "GET",
    success: function (data) {
      $("#loadedContent").html(data);
    },
    error: function () {
      console.error("Failed to load another page");
    },
  });
}
