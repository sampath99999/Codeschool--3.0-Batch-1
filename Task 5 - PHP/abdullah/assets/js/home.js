function fetchMovieData() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentMovies.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      let moviesCard = "";
      for (let index = 0; index < resData.data.length; index++) {
        let movie = resData.data[index];
        moviesCard += `
              <div class="movie-card col-3">
                <img class="movie-image" src="${movie.img_url}" alt="Movie Poster">
                <div class="movie-details">
                  <div class="movie-title">${movie.title}</div>
                  <div class="movie-language">Language: ${movie.language}</div>
                  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#bookNowModal" data-movie-id="${movie.id}"> Book Now </button>
                </div>
              </div>
            `;
      }

      $(".movieCardsContainer").html(moviesCard);
    }
  );
}

fetchMovieData();

function fetchMovieTitles() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentMovies.php",
    function (res, status) {
      var resData = JSON.parse(res);
      // console.log(resData.data);

      $("#movieSelect").empty();

      for (let index = 0; index < resData.data.length; index++) {
        $("#movieSelect").append(`
              <option value="${resData.data[index].id}">${resData.data[index].title}</option>
            `);
      }
      $("#movieSelect").append(
        '<option value="" selected>Remove a movie</option>'
      );
    }
  );
}

fetchMovieTitles();

function fetchBranchNames() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentTheatres.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      $("#theatreSelect").empty();

      for (let index = 0; index < resData.data.length; index++) {
        $("#theatreSelect").append(`
                <option value="${resData.data[index].branch_name}">${resData.data[index].branch_name}</option>
              `);
      }
      $("#theatreSelect").append(
        '<option value="" selected>Remove a Theatre Branch</option>'
      );
    }
  );
}

fetchBranchNames();
var movie_id;
var noOfSeats;
var selectedSeats;
var selectedTheatre;
var selectedRadioValue;
$("#bookNowModal").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget);
  var movie_id = button.data("movie-id");

  console.log("Selected Movie ID:", movie_id);

  selectedSeats = $(
    "#bookNowModal .modal-body select[aria-label='Default select example']"
  ).val();
  selectedTheatre = $("#theatreSelect").val();
    selectedRadioValue = $(
    "#bookNowModal .modal-body input[name='flexRadioDefault']:checked"
  ).val();
  movie_id = $("#movieSelect").val(); // Corrected variable name
  noOfSeats = $("#noOfSeats").val();
  num_tickets = noOfSeats;
});
function bookTickets() {
  $.post(
    "http://localhost:3000/api/admin/bookTickets.php",
    {
      movie_id: movie_id,
      noOfSeats: noOfSeats,
      branchName: selectedTheatre,
      num_tickets: num_tickets,
    },
    function (res) {
      console.log(res);
      resData = JSON.parse(res);
      console.log(resData);
    }
  );
}
