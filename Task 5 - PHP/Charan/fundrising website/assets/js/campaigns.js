let campaignForm = document.getElementById("getCampaignForm");
campaignForm.addEventListener("click", getCampaignForm);

function getCampaignForm() {
  window.location.href = "campaignForm.html";
}

$.ajax({
  url: "./api/getCampaign.php",
  type: "GET",
  dataType: "json",
  success: function (data) {
    console.log("Data received from AJAX:", data);
    renderCampaigns(data);
  },
  error: function (xhr, status, error) {
    console.error("Error fetching data:", error);
    console.log("XHR:", xhr.responseText); // Log the response text
  },
});

function renderCampaigns(campaigns) {
  var tableBody = document.getElementById("productTableBody");
  tableBody.innerHTML = "";
  for (var i = 0; i <= campaigns.length; i++) {
    var campaign = campaigns[i];
    var row = document.createElement("tr");
    var campaignHTML = `
      <td><p class="campaignname">${campaign.name}</p></td>
      <td><p class="price">${campaign.campagin_name}</p></td>
      <td><p class="desc">${campaign.description}</p></td>
      <td><p>${campaign.goal}</p></td>
      <td><button class="Delete">Delete</button></td>
    `;
    row.innerHTML = campaignHTML;
    tableBody.appendChild(row);
    var userId = campaign.userid;
    var deleteButton = row.querySelector(".Delete");
    deleteButton.addEventListener("click", function () {
      $.ajax({
        url: "./api/campaginDelete.php",
        method: "POST",
        data: {
          userid: userId,
        },
        success: (response) => {
          function renderCampaigns(campaigns) {
            var tableBody = document.getElementById("productTableBody");
            tableBody.innerHTML = "";

            for (var i = 0; i < campaigns.length; i++) {
              var campaign = campaigns[i];
              var row = document.createElement("tr");
              var campaignHTML = `
            <td><p class="campaignname">${campaign.name}</p></td>
            <td><p class="price">${campaign.campagin_name}</p></td>
            <td><p class="desc">${campaign.description}</p></td>
            <td><p>${campaign.goal}</p></td>
            <td><button class="Delete" data-campaignid="${campaign.id}" data-userid="${campaign.userid}">Delete</button></td>
        `;
              row.innerHTML = campaignHTML;
              tableBody.appendChild(row);

              var deleteButton = row.querySelector(".Delete");
              var userId = campaign.userid;

              deleteButton.addEventListener("click", function () {
                var campaignId = this.getAttribute("data-campaignid");
                var userId = this.getAttribute("data-userid");

                $.ajax({
                  url: "./api/campaginDelete.php",
                  method: "POST",
                  data: {
                    campaignid: campaignId,
                    userid: userId,
                  },
                  success: function (response) {
                    response = JSON.parse(response);
                    if (!response.status) {
                      alert(response.message);
                      return false;
                    }

                    // Remove the deleted row from the table
                    var deletedRow = deleteButton.closest("tr");
                    deletedRow.remove();
                  },
                  error: function (response) {
                    console.log(response);
                  },
                });
              });
            }
          }

          response = JSON.parse(response);
          if (!response.status) {
            alert(response.message);
            return false;
          }
        },
        error: (response) => {
          console.log(response);
        },
      });
    });
  }
}

// function renderCampaigns(campaigns) {
//   var tableBody = document.getElementById("productTableBody");
//   tableBody.innerHTML = "";

//   campaigns.forEach(function (campaign) {
//     var row = document.createElement("tr");

//     // Use template string to create HTML structure
//     var campaignHTML = `
//     <td><p class="userid">${campaign.userid}</p></td>
//         <td><p class="campaignname">${campaign.name}</p></td>
//         <td><p class="price">${campaign.campagin_name}</p></td>
//         <td><p class="desc">${campaign.description}</p></td>
//         <td><p>${campaign.goal}</p></td>
//         <td><button class="Delete">Delete</button></td>
//       `;

//     // Set innerHTML of the row using the campaignHTML
//     row.innerHTML = campaignHTML;
//     // Append the row to the table body
//     tableBody.appendChild(row);

//     // Add event listener to the "Add to Cart" button
//   });
// }
