$("#listAllShows").click(function () {
  $(".showsTable").css("visibility", "visible");
  $(".allShows").css("visibility", "visible");

  fetchAndRenderShows();
});

$("#addShows").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

function fetchAndRenderShows() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentShows.php",
    function (res, status) {
      var resData = JSON.parse(res);

      let showsTablehtml = [];
      for (let index = 0; index < resData.data.length; index++) {
        showsTablehtml += `
              <tr>
                <td>${resData.data[index].show_id}</td>
                <td>${resData.data[index].branch_name}</td>
                <td>${resData.data[index].screen_no}</td>
                <td>${resData.data[index].movie_name}</td>
                <td>${resData.data[index].start_time}</td>                
                <td>${resData.data[index].running_show}</td>
              </tr>
            `;
      }

      $(".showsRender").html(showsTablehtml);
    }
  );
}

// movies title render

function fetchMovieTitles() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentMovies.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      $(".movieSelect  ").empty();

      // console.log("1");
      for (let index = 0; index < resData.data.length; index++) {
        $(".movieSelect ").append(`
            <option value="${resData.data[index].id}">${resData.data[index].title}</option>
          `);
      }
      //console.log("2");
      $(".movieSelect  ").append(
        '<option value="" selected>Select a movie</option>'
      );
      //console.log("3");
    }
  );
}
fetchMovieTitles();

// Show Ids Render

function fetchShowIds() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentShows.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      $(".showSelect").empty();

      for (let index = 0; index < resData.data.length; index++) {
        $(".showSelect").append(`
          <option value="${resData.data[index].show_id}">Show ID : ${resData.data[index].show_id}</option>
        `);
      }

      $(".showSelect").append(
        '<option value="" selected>Remove a show</option>'
      );
    }
  );
}

fetchShowIds();

// Branch names render

function fetchBranchNames() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentTheatres.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      $(".theatreSelect").empty();

      for (let index = 0; index < resData.data.length; index++) {
        $(".theatreSelect").append(`
              <option value="${resData.data[index].id}">${resData.data[index].branch_name}</option>
            `);
      }
      $(".theatreSelect").append(
        '<option value="" selected>Select a Theatre Branch</option>'
      );
    }
  );
}

fetchBranchNames();

$(".theatreSelect").on("change", function () {
  var selectedBranchName = $(this).val();

  if (selectedBranchName !== "") {
    console.log("Selected value " + selectedBranchName);
  }
});

$("input[name='flexRadioDefault']").on("change", function () {
  var ScreenNo = $(this).val();
  console.log("Screen no:" + ScreenNo);
});

// Time slots render

function fetchTimeSlots() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentSlots.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log("Slots: " + resData);

      $(".slotSelect").empty();

      for (let index = 0; index < resData.data.length; index++) {
        $(".slotSelect").append(`
          <option value="${resData.data[index].id}">${resData.data[index].start_time}</option>
        `);
      }
      $(".slotSelect").append(
        '<option value="" selected>Select a Time Slot </option>'
      );

      console.log("selected slot:", resData.data.start_time);
    }
  );
}

fetchTimeSlots();

$(".slotSelect").on("change", function () {
  var selectedSlot = $(this).val();

  if (selectedSlot !== "") {
    console.log("Selected value " + selectedSlot);
  }
});

// Time slots render

fetchTimeSlots();
fetchBranchNames();

$(".theatreSelect").on("change", function () {
  var selectedBranchName = $(this).val();

  if (selectedBranchName !== "") {
    console.log("Selected value " + selectedBranchName);
  }
});

$(".addShowButton").click(function () {
  // Get values from the form or select appropriate values
  var selectedBranchName = $(".theatreSelect").val();
  var selectedScreenNo = $("input[name='flexRadioDefault']:checked").val();
  var selectedMovieTitle = $(".movieSelect").val();
  var selectedSlot = $(".slotSelect").val();

  console.log(
    "  selectedBranchName " +
      selectedBranchName +
      "  selectedScreenNo " +
      selectedScreenNo +
      "  selectedMovieTitle " +
      selectedMovieTitle +
      "  selectedSlot " +
      selectedSlot
  );

  if (
    selectedBranchName === "" ||
    selectedScreenNo === "" ||
    selectedMovieTitle === "" ||
    selectedSlot === ""
  ) {
    console.log("Please fill in all fields.");
    return;
  } else {
    console.log(
      "xyz" +
        selectedBranchName +
        " " +
        selectedScreenNo +
        " " +
        selectedMovieTitle +
        " " +
        selectedSlot
    );

    $.post("http://localhost:3000/api/admin/addShows.php", {
      selectedBranchName: selectedBranchName,
      selectedScreenNo: selectedScreenNo,
      selectedMovieTitle: selectedMovieTitle,
      selectedSlot: selectedSlot,
    }).then(function (res, status) {
      console.log(res);
      console.log(status);
      fetchAndRenderShows();
    });
  }
});

// remove show

$(".showSelect").on("change", function () {
  var showSelect = $(this).val();
  console.log("zzzz" + showSelect);
  if (showSelect !== "") {
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
          text: showSelect + " has been deleted successfully",
          icon: "success",
        });
        removeShow(showSelect);
      } else {
        inputElement.val("");
      }
    });
  }
});

// function removeShow(showSelect) {
// $.get("http://localhost:3000/api/admin/listCurrentShows.php").then(function (res, status) {
//   var resData = JSON.parse(res);
//   console.log(resData.data.running_show === "true"|| resData.data.running_show === true););

//   for (let index = 0; index < resData.data.length; index++) {
//     if (resData.data[index].show_id === showSelect) {
     
// }




//   $.post("http://localhost:3000/api/admin/removeShow.php", {
//     showSelect: showSelect,
//   }).then(function (res, status) {
//     console.log(res);
//     console.log(status);
//     if (status === "success" || status === true) {
//       fetchVideoTitles();
//       console.log(showSelect + " has been deleted successfully");
//       fetchAndRenderShows();
//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "success",
//         title: showSelect + " has been deleted successfully",
//       });
//     }
//   });
// }
function removeShow(showSelect) {
  console.log("removeShow " + showSelect);

  // Check if the show is currently running
  $.post("http://localhost:3000/api/admin/showStatus.php", {
    showSelect: showSelect,
  }).then(function (res, status) {
    console.log("Raw Response:", res);

    try {
      const resData = JSON.parse(res);
      console.log(resData)

      if (resData.status) {
        console.log("Show is running now, cannot be deleted");
        // Handle this case, perhaps show a message to the user.
      } else {
        // Proceed to remove the show
        $.post("http://localhost:3000/api/admin/removeShow.php", {
          showSelect: showSelect,
        }).then(function (resRemove, statusRemove) {
          console.log("Raw Remove Response:", resRemove);

          try {
            const resRemoveData = JSON.parse(resRemove);

            if (resRemoveData.status) {
              // Update UI after successful deletion
              fetchVideoTitles();
              fetchAndRenderShows();
              console.log(showSelect + " has been deleted successfully");

              // Show success notification
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
                title: showSelect + " has been deleted successfully",
              });
            } else {
              console.error("Error removing show:", resRemoveData.message);
              // Handle the error, show a message to the user, etc.
            }
          } catch (error) {
            console.error("Error parsing JSON response:", error);
          }
        });
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
    }
  });
}
