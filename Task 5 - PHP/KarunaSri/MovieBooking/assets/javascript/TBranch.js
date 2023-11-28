$(document).ready(function () {
  getBranches();
});

function getBranches() {
  console.log("calling api");
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/getBranches.php",
    method: "GET",
    success: function (response) {
      $("#branchtable").html(response);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}

function addBranch() {
  let name = $("#branchName").val();
  let address = $("#address").val();
  let capacity = $("#capacity").val();
  let theaterid = $("#theaterid").val();

  console.log(name);
  console.log(address);
  console.log(capacity);
  console.log(theaterid);

  $("#para").html("<a href=#> Yeah its working</a>");
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/addBranches.php",
    method: "POST",
    data: {
      name,
      theaterid,
      address,
      capacity,
    },
    success: (response) => {
      console.log(response);
      $("#show_alert").html(
        `<div class="alert alert-success" role="alert">${response}</div>`
      );
      getBranches();
    },
    error: (response) => {
      console.log(response);
    },
  });
}

function deleteBranch(branchid) {
  let id = branchid;
  console.log(id);
  $.ajax({
    url: "http://localhost/MOVIEBOOKING/api/deleteBranches.php",
    method: "POST",

    data: {
      id,
    },
    success: function (response) {
      console.log(response);
      $("#show_alert").html(
        `<div class="alert alert-success" role="alert">${response}</div>`
      );
      getBranches();
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}
