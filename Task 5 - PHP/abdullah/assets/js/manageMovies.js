$("#listAllMovies").click(function () {
  $(".moviesTable").css("visibility", "visible");
  $(".allMovies").css("visibility", "visible");

  fetchAndRenderMovies();
});

function fetchAndRenderMovies() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentMovies.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      let moviesTablehtml = [];
      for (let index = 0; index < resData.data.length; index++) {
        moviesTablehtml += `
            <tr>
              <td>${resData.data[index].id}</td>
              <td>${resData.data[index].title}</td>
              <td>${resData.data[index].description}</td>
              <td>${resData.data[index].language}</td>
              <td>${resData.data[index].status}</td>
              
            </tr>
          `;
      }

      $(".moviesRender").html(moviesTablehtml);
    }
  );
}

$("#addMovieModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

$(".addMovieButton").click(function () {
  var title = $("#title").val();
  var description = $("#description").val();
  var language = $("#language").val();
  // var movieStatus = $("#movieStatus").val();
  var movieStatus = $("input[name='flexRadioDefault']:checked").val();
  // console.log(movieStatus);

  console.log(+title + description + language + movieStatus);

  $.post("http://localhost:3000/api/admin/addNewMovie.php", {
    title: title,
    description: description,
    language: language,
    movieStatus: movieStatus,
  }).then(function (status, res) {
    fetchAndRenderTheatres();
    console.log(res);
    console.log(status);
    fetchAndRenderMovies();
  });
});

// Remove Movie

$("#movieSelect").on("change", function () {
  var selectedMovieTitle = $(this).val();

  if (selectedMovieTitle !== "") {
    var inputElement = $(this);

    var confirmation = Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: selectedMovieTitle + " has been deleted successfully",
          icon: "success",
        });
        removeMovie(selectedMovieTitle);
      } else {
        inputElement.val("");
      }
    });
  }
});

function removeMovie(movieTitle) {
  $.post("http://localhost:3000/api/admin/removeMovie.php", {
    title: movieTitle,
  }).then(function (res, status) {
    console.log(res);
    console.log(status);
    if (status === "success" || status === true) {
      fetchMovieTitles();
      console.log(movieTitle + " has been deleted successfully");
      fetchAndRenderMovies();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: movieTitle + " has been deleted successfully",
      });
    }
  });
}

function fetchMovieTitles() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentMovies.php",
    function (res, status) {
      var resData = JSON.parse(res);
      // console.log(resData.data);

      $("#movieSelect").empty();

      for (let index = 0; index < resData.data.length; index++) {
        $("#movieSelect").append(`
          <option value="${resData.data[index].title}">${resData.data[index].title}</option>
        `);
      }
      $("#movieSelect").append(
        '<option value="" selected>Remove a movie</option>'
      );
    }
  );
}

fetchMovieTitles();
