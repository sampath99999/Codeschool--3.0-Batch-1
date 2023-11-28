document.addEventListener("DOMContentLoaded", function () {
  const campaignForm = document.getElementById("FormCampaign");
  campaignForm.addEventListener("click", ToCampaignDatabase);

  function ToCampaignDatabase() {
    let name = document.getElementById("name").value;
    let program = document.getElementById("campaign").value;
    let description = document.getElementById("campaign-description").value;
    let mobile = document.getElementById("Mobile").value;
    let goal = document.getElementById("Goal").value;

    $.ajax({
      url: "./api/campagin.php",
      method: "POST",
      data: {
        name,
        program,
        description,
        mobile,
        goal,
      },
      success: (response) => {
        response = JSON.parse(response);
        if (!response.status) {
          alert(response.message);
          return false;
        }
        location.href = "./campagins.html";
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
});
