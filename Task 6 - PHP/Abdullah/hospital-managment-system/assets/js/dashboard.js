$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

adminName = localStorage.getItem("adminName");
$('.adminName').empty();
$('.adminName').append(adminName);

console.log("before data call");
// dashboard data
try {

    $.get("http://localhost:3000/api/getDashboardData.php")
        .then(function (res) {
            var resData = JSON.parse(res);
            console.log(resData.data[0]);
            console.log(resData.status);

            if (resData.status) {
                console.log(resData.data.total_doctors, resData.data.total_billed_amount, resData.data.total_patients, resData.data.total_appointments_booked, resData.data.total_prescribed_medicines);

                $(".noOfDoctors").empty().append(resData.data[0].total_doctors);
                $(".totalAmount").empty().append("$ "+resData.data[0].total_billed_amount);
                $(".noOfPatients").empty().append(resData.data[0].total_patients);
                $(".noOfAppointments").empty().append(resData.data[0].total_appointments_booked);
                $(".noOfMedicines").empty().append(resData.data[0].total_prescribed_medicines);

            } else {
                console.error("Error fetching dashboard data:", resData.message);
            }
        })
        .catch(function (error) {
            console.error("An unexpected error occurred:", error);
        });
} catch (error) {
    console.error("An unexpected error occurred:", error);
}

//   doctors
  try {
    $.get("http://localhost:3000/api/getDoctorInfo.php").then(function (res) {
      var resData = JSON.parse(res);
      console.log(resData);
      console.log(resData.status);
      if (resData.status) {
        $("#doctorTableBody").empty();

        var tableBody = $("#doctorTableBody");
        resData.data.forEach((doctor) => {
          tableBody.append(`
              <tr>
                <td>${doctor.name}</td>
                <td>${doctor.phone}</td>
                <td>${doctor.email}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.gender}</td>
              </tr>
            `);
        });
      } else {
        console.error("Error fetching doctors:", resData.message);
      }
    });
  } catch (error) {
    console.error("An error occurred during the AJAX request:", error);
  }

  // appointments

  try {
    $.get("http://localhost:3000/api/getAppointment.php").then(function (res) {
      var resData = JSON.parse(res);
      console.log(resData);
      console.log(resData.status);
      if (resData.status) {
        $("#appointmentTableBody").empty();

        var tableBody = $("#appointmentTableBody");
        resData.data.forEach((appointment) => {
          tableBody.append(`
                <tr>
                  <td>${appointment.patient_name}</td>
                  <td>${appointment.doctor_name}</td>
                  <td>${appointment.date}</td>
                  <td>${appointment.time}</td>
                </tr>
              `);
        });
      } else {
        console.error("Error fetching appointments:", resData.message);
      }
    });
  } catch (error) {
    console.error("An error occurred during the AJAX request:", error);
  }

  //   patient

  try {
    $.get("http://localhost:3000/api/getPatient.php").then(function (res) {
      var resData = JSON.parse(res);
      console.log(resData);
      console.log(resData.status);
      if (resData.status) {
        $("#patientTableBody").empty();

        var tableBody = $("#patientTableBody");
        resData.data.forEach((appointment) => {
          tableBody.append(`
                <tr>
                  <td>${appointment.name}</td>
                  <td>${appointment.phone}</td>
                  <td>${appointment.email}</td>
                  <td>${appointment.bloodgroup}</td>
                  <td>${appointment.gender}</td>
                  <td>${appointment.age}</td>


                </tr>
              `);
        });
      } else {
        console.error("Error fetching appointments:", resData.message);
      }
    });
  } catch (error) {
    console.error("An error occurred during the AJAX request:", error);
  }

  //   prescription

  try {
    $.get("http://localhost:3000/api/getPrescriptions.php").then(function (res) {
      var resData = JSON.parse(res);
      console.log(resData);
      console.log(resData.status);
      if (resData.status) {
        $("#prescriptionTableBody").empty();

        var tableBody = $("#prescriptionTableBody");
        resData.data.forEach((prescription) => {
          tableBody.append(`
                <tr>
                  <td>${prescription.date}</th>
                  <td>${prescription.doctor_name}</th>
                  <td>${prescription.patient_name}</th>
                  <td>${prescription.age}</th>
                  <td>${prescription.medicines}</th>
                  <td>${prescription.remarks}</th>

                </tr>
              `);
        });
      } else {
        console.error("Error fetching prescriptions:", resData.message);
      }
    });
  } catch (error) {
    console.error("An error occurred during the AJAX request:", error);
  }

//   bills
try {
    $.get("http://localhost:3000/api/getBills.php").then(function (res) {
      var resData = JSON.parse(res);
      console.log(resData);
      console.log(resData.status);
      if (resData.status) {
        $("#billTableBody").empty();

        var tableBody = $("#billTableBody");
        resData.data.forEach((bill) => {
          tableBody.append(`
                <tr>
                  <td>${bill.bill_no}</th>
                  <td>${bill.appointment_id}</th>
                  <td>${bill.patient_name}</th>
                  <td>${bill.examined_by}</th>
                  <td>${bill.amount}</th>

                </tr>
              `);
        });
      } else {
        console.error("Error fetching prescriptions:", resData.message);
      }
    });
  } catch (error) {
    console.error("An error occurred during the AJAX request:", error);
  }
});
