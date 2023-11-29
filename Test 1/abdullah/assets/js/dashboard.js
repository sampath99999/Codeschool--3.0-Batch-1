$(document).ready(function () {
  $(".viewBtn").on("click", function () {
    var jsonString = $(this).data("donation");

    var resData = JSON.parse(jsonString);

    openModal(resData);
  });
});
function openModal(resData) {
  const modalBody = $("#modalBody");
  modalBody.empty();

  let donationDetailsHTML = "";

  donationDetailsHTML += `
      <p><strong>Full Name:</strong> ${resData.name}</p>
      <p><strong>Email:</strong> ${resData.email}</p>
      <p><strong>Phone Number:</strong> ${resData.phoneno}</p>
      <p><strong>Payment Status:</strong> ${resData.paymentstatus}</p>
      <p><strong>Amount:</strong> $${resData.amountdonated}</p>
      <p><strong>Expiration Date:</strong> ${resData.expirationdate}</p>
      <p><strong>CVV:</strong> ${resData.cvv}</p>
      <p><strong>IFSC Code:</strong> ${resData.ifsccode}</p>
  `;
  modalBody.html(donationDetailsHTML);
  $("#viewModal").modal("show");
}

function fetchDonationData() {
  $.get(
    "http://localhost:3000/api/admin/getDonations.php",
    function (res, status) {
      var resData = JSON.parse(res);
      console.log(resData.data);

      $("#donationContainer").empty();

      for (let i = 0; i < resData.data.length; i++) {
        $("#donationContainer").append(`
            <div class="donation-card col-12">
                <div class="donation-info">
                    <div class="full-name">${resData.data[i].name}</div>
                    <div class="amount">$${
                      resData.data[i].amountdonated
                    }</div> <!-- Fix here -->
                </div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#viewModal" onclick="openModal(${JSON.stringify(
                  resData.data[i]
                )})">
                    View
                </button>
            </div>
        `);
      }
    }
  );
}

fetchDonationData();
