$(document).ready(function () {
  getShowList();
  //   alert("hello");
});

function addShow() {
  var showName = $("#showName").val();
  var showTime = $("#showTime").val();
  var showDate = $("#showDate").val();

  $.ajax({
    type: "POST",
    url: "api.php",
    data: {
      action: "addShow",
      showName: showName,
      showTime: showTime,
      showDate: showDate,
    },
    success: function (response) {
      console.log(response);
      // Update the show list after adding a show
      getShowList();
    },
    error: function (error) {
      console.error("Error adding show:", error);
    },
  });
}

// Function to get the list of shows
function getShowList() {
  $.ajax({
    type: "POST",
    url: "http://localhost/MOVIEBOOKING/api/shows.php",
    data: { action: "getShowList" },
    success: function (response) {
      $("#showtable").html(response);
    },
    error: function (error) {
      console.error("Error getting show list:", error);
    },
  });
}

// Function to delete a show
function deleteShow(showId) {
  $.ajax({
    type: "POST",
    url: "api.php",
    data: { action: "deleteShow", showId: showId },
    success: function (response) {
      console.log(response);
      // Update the show list after deleting a show
      getShowList();
    },
    error: function (error) {
      console.error("Error deleting show:", error);
    },
  });
}

// Get the initial show list on page load
getShowList();
