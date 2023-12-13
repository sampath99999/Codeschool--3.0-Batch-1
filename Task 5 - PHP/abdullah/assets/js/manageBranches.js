$("#listAllTheatres").click(function () {
  $(".theatresTable").css("visibility", "visible");
  $(".allTheatres").css("visibility", "visible");

  fetchAndRenderTheatres();
});

function fetchAndRenderTheatres() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentTheatres.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      let theatresTablehtml = [];
      for (let index = 0; index < resData.data.length; index++) {
        theatresTablehtml += `
            <tr>
              <td>${resData.data[index].id}</td>
              <td>${resData.data[index].branch_name}</td>
              <td>${resData.data[index].city}</td>
              <td>${resData.data[index].address}</td>
              <td>${resData.data[index].status}</td>
            </tr>
          `;
      }

      $(".theatresRender").html(theatresTablehtml);
    }
  );
}

// Add Theatre Branches

function fetchAndRenderTheatres() {
  $.get(
    "http://localhost:3000/api/admin/listCurrentTheatres.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      let theatresTablehtml = [];
      for (let index = 0; index < resData.data.length; index++) {
        theatresTablehtml += `
            <tr>
              <td>${resData.data[index].id}</td>
              <td>${resData.data[index].branch_name}</td>
              <td>${resData.data[index].city}</td>
              <td>${resData.data[index].address}</td>
              <td>${resData.data[index].status}</td>
            </tr>
          `;
      }

      $(".theatresRender").html(theatresTablehtml);
    }
  );
}

$(".addTheatreButton").click(function () {
  var branchName = $("#branchName").val();
  var city = $("#city").val();
  var address = $("#address").val();
  var theatreStatus = $("input[name='flexRadioDefault']:checked").val();
  console.log("theatreStatus" + theatreStatus);
  //   var theatreStatus = $("#theatreStatus").val();
  // console.log("before post call");
  //   console.log(idToAddTheatre + branchName + city + address + theatreStatus);

  $.post("http://localhost:3000/api/admin/addNewTheatre.php", {
    branchName: branchName,
    city: city,
    address: address,
    theatreStatus: theatreStatus,
  }).then(function (status, res) {
    // console.log(res);
    console.log(status);
    fetchAndRenderTheatres();
  });
});

// Remove Branches

$("#theatreSelect").on("change", function () {
//   console.log("This.val: " + this.val());
  var selectedTheatreName = $(this).val();

  if (selectedTheatreName !== "") {
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
          text: selectedTheatreName + " has been deleted successfully",
          icon: "success",
        });
        removeTheatre(selectedTheatreName);
      } else {
        inputElement.val("");
      }
    });
  }
});

function removeTheatre(branchName) {
  $.post("http://localhost:3000/api/admin/removeTheatre.php", {
    branchName: branchName,
  }).then(function (res, status) {
    console.log(res);
    console.log(status);
    if (status === "success" || status === true) {
      fetchBranchNames();
      console.log(branchName + " has been deleted successfully");
      fetchAndRenderTheatres();
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
        title: branchName + " has been deleted successfully",
      });
    }
  });
}

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
