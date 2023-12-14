$(document).ready(function () {
  var userToken = localStorage.getItem("token");
  if (!userToken) {
    window.location.href = "/templates/login.html";
  }
  $(".addAppointmentModal").click(function () {

    console.log("before call");
    $.get("http://localhost:3000/api/getDoctor.php").then(function (res) {
      var resData = JSON.parse(res);
      console.log(resData.status);
      if (resData.status) {
        $("#doctor").empty();

        $("#doctor").append(
          '<option value="" selected disabled>Select Doctor</option>'
        );

        resData.data.forEach(function (doctor) {
          $("#doctor").append(
            '<option value="' +
              doctor.id +
              '">' +
              doctor.name +
              " - " +
              doctor.specialization +
              "</option>"
          );
        });
      } else {
        console.error("Error fetching doctors:", resData.message);
      }
    });
  });

  $(".scheduleAppointment").click(function () {
    var selectedDoctor = $("#doctor").val();
    var selectedDate = $("#appointmentDate").val();
    var selectedTime = $("#appointmentTime").val();
    var id = localStorage.getItem("id");

    console.log("Selected Doctor:", selectedDoctor);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    console.log("id", id);
    console.log("before call");

    $.post("http://localhost:3000/api/addAppointment.php", {
      selectedDoctor: selectedDoctor,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      id: id,
    }).then(function (res) {
      console.log(res);
      var resData = JSON.parse(res);
      console.log(resData.status);
      if (resData.status) {
        swal("appointment booked successfully!", "Thank You", "success");
      } else {
        alert("couldn't book appointment");
      }
    });
  });
  $(".getPrescription").click(function () {
    var id = parseInt(localStorage.getItem("id"));
    console.log(id);
    console.log("before prescription call");
    $.post("http://localhost:3000/api/getPrescription.php", { id: id }).then(
      function (res) {
        console.log(res);
        var result = JSON.parse(res);
        console.log(result);
        if (result.status) {
          // Prescription data received successfully
          var prescriptionData = result.data;

          // Update the modal content
          $("#getPrescription .modal-body").html(
            "<p>Name: " +
              prescriptionData[0].name +
              "</p>" +
              "<p>Date: " +
              prescriptionData[0].date +
              "</p>" +
              "<p>Age: " +
              prescriptionData[0].age +
              "</p>" +
              "<p>Medicines: " +
              prescriptionData[0].medicines +
              "</p>" +
              "<p>Remarks: " +
              prescriptionData[0].remarks +
              "</p>"
          );

          // Show the modal using the modal method
          $("#getPrescription").modal("show");
        } else {
          // Error while fetching prescription
          console.error("Error: ", result.message); // Log the error message
          alert("Error while fetching prescription");
        }
      }
    );
  });

  $(".getBill").click(function () {
    var id = parseInt(localStorage.getItem("id"));

    console.log("before bill call");
    $.post("http://localhost:3000/api/getBill.php", { id: id }).then(function (
      res
    ) {
      var result = JSON.parse(res);
      console.log(result);
      if (result.status) {
        // Bill data received successfully
        var billData = result.data;

        // Update the modal content dynamically
        var modalContent = "";
        billData.forEach(function (bill) {
          modalContent +=
            "<p>Date: " +
            bill.date +
            "</p>" +
            "<p>Amount: $" +
            bill.amount +
            "</p>" +
            "<hr>";
        });

        // Update the modal body content
        $("#getBill .getBillModal").html(modalContent);

        // Show the modal using the modal method
        $("#getBill").modal("show");
      } else {
        // Error message
        console.error("Error: ", result.message);
        alert("Error while fetching bill");
      }
    });
  });
});
