
  document.addEventListener("DOMContentLoaded", function () {
    const campaignForm = document.getElementById("btn");
    campaignForm.addEventListener("click", ToCampaignDatabase);
  
    function ToCampaignDatabase() {
      let name = document.getElementById("name").value;
      let description = document.getElementById("description").value;
      let goal_amount = document.getElementById("goal_amount").value;
      let start_date = document.getElementById("start_date").value;
      let end_date = document.getElementById("end_date").value;
  
      $.ajax({
        url: "./backend/campaign_list.php",
        method: "POST",
        data: {
          name,
          description,
          goal_amount,
          start_date,
          end_date
        },
        success: (response) => {
          response = JSON.parse(response);
          if (!response.status) {
            alert(response.message);
            return false;
          }
          location.href = "./campaign.html";
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  });