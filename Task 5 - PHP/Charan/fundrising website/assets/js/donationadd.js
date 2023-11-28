document.addEventListener("DOMContentLoaded", function () {
  const donationForm = document.getElementById("submitDonation");
  donationForm.addEventListener("click", ToDonationDatabase);

  function ToDonationDatabase() {
    let donor_name = document.getElementById("donor_name").value;
    let donor_email = document.getElementById("donor_email").value;
    let amount = document.getElementById("amount").value;

    $.ajax({
      url: "./api/donationadd.php",
      method: "POST",
      data: {
        donor_name,
        donor_email,
        amount,
      },
      success: (response) => {
        response = JSON.parse(response);
        if (!response.status) {
          alert(response.message);
          return false;
        }
        location.href = "./donation.html";
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
});
