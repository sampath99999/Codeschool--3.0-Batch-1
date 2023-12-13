$(document).ready(function () {
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/dropdown.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      Dropdown(data);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });

  function Dropdown(data) {
    var dynamicDropdown = $("#dynamicDropdown");

    // Iterate through the data and append dropdown items
    data.forEach(function (item) {
      var html =
        '<a class="dropdown-item" href="#">' + item.dropdown_item + "</a>";
      dynamicDropdown.append(html);
    });
  }
});
