
document.addEventListener("DOMContentLoaded", function () {
    const donationForm = document.getElementById("submitDonation");
    donationForm.addEventListener("click", ToDonationDatabase);
  
    function ToDonationDatabase() {
      let donor_name = document.getElementById("donor_name").value;
      let donor_email = document.getElementById("donor_email").value;
      let amount = document.getElementById("amount").value;
      let donation_date = document.getElementById("donation_date").value;
  
      $.ajax({
        url: "./backend/donation_list.php",
        method: "POST",
        data: {
          donor_name,
          donor_email,
          amount,
          donation_date,
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