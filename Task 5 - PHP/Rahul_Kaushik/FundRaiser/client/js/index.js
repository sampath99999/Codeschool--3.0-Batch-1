if (!localStorage.getItem("token")) {
  location.href = "./login.html";
}

burger = document.querySelector(".toggle-sidebar-btn");
sideBar = document.querySelector(".sidebar");
mainContent = document.querySelector(".main");

burger.addEventListener("click", () => {
  sideBar.classList.toggle("w-class-resp");
  mainContent.classList.toggle("m-class-resp");
});

$(document).ready(() => {
  getDonationsCount();
  getCollectedAmount();
  getTotalUsers();
  getListRecentOfDonors();
  getListOfDonors();
  getAllCampaigns();
  getOngoingCampaigns();
  getSuccessfulCampaigns();
  getUserData();

  $('#openDonationModal').click(function() {
    $('#donationModal').modal('show');
  });
  $('#openCreationModal').click(function() {
    $('#campaignCreationModal').modal('toggle');
  });

  $('#saveDonation').click(function () {
    var user_id = parseInt(document.getElementById('userIdentity').innerHTML, 10);
    const campaign_id = $('#campaignName').val();
    const amount = $('#donationAmount').val();
    console.log(user_id);
  
    $.ajax({
      url: 'http://localhost/Codeschool/Task5/FundRaiser/server/api/setDonation.php',
      method: 'POST',
      data: {
        user_id,
        campaign_id,
        amount
      },
      success: function (response) {
        console.log(response);
  
        Swal.fire({
          icon: 'success',
          title: 'Donation Successful!',
          text: 'Thank you for your contribution.',
        });
        location.reload();
  
        $('#donationModal').modal('hide');
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  })

  $('#saveCampaign').click(function () {
    var user_id = parseInt(document.getElementById('userIdentityTwo').innerHTML, 10);
    const eventname = $('#eventName').val();
    const totalgoal = $('#totalGoal').val();
    const date = $('#eventDate').val();
    const description = $('#eventDescription').val();
    console.log(user_id);
  
    $.ajax({
      url: 'http://localhost/Codeschool/Task5/FundRaiser/server/api/setCampaigns.php',
      method: 'POST',
      data: {
        user_id,
        eventname,
        totalgoal,
        date,
        description
      },
      success: function (response) {
        console.log(response);
  
        Swal.fire({
          icon: 'success',
          title: 'Donation Successful!',
          text: 'Thank you for your contribution.',
        });
        location.reload();
  
        $('#donationModal').modal('hide');
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  })

  
});

function getDonationsCount() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getDonationsCount.php",
    method: "GET",
    success: function (response) {
      console.log(response);
      console.log(response[0].count);
      $("#donationsCount").text(response[0].count);
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getCollectedAmount() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getCollectedAmountSum.php",
    method: "GET",
    success: function (response) {
      console.log(response);
      console.log(response[0].count);
      $("#collectedAmount").text(response[0].sum);
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getTotalUsers() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getTotalUsers.php",
    method: "GET",
    success: function (response) {
      console.log(response);
      console.log(response[0].count);
      $("#totalUsers").text(response[0].count);
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getListRecentOfDonors() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getListOfRecentDonors.php",
    method: "GET",
    success: function (users) {
      console.log(users);
      users.forEach((user) => {
        const newDiv = document.createElement("div");
        newDiv.className = "activity-item d-flex";
        newDiv.innerHTML = `
                <div class="activity-label">$${user.amount}</div>
                <div class="activity-content">By ${user.fullname} in ${user.eventname} on ${user.donated_at}</div>
                
                `;
        var body = document.getElementById("recentDonorsList");
        body.appendChild(newDiv);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getListOfDonors() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getListOfDonors.php",
    method: "GET",
    success: function (users) {
      console.log(users);
      users.forEach((user) => {
        const newDiv = document.createElement("div");
        newDiv.className = "activity-item d-flex";
        newDiv.innerHTML = `
                <div class="activity-label">$${user.amount}</div>
                <div class="activity-content">By ${user.fullname} in ${user.eventname} on ${user.donated_at}</div>
                
                `;
        var body = document.getElementById("DonorsList");
        body.appendChild(newDiv);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getAllCampaigns() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getAllCampaigns.php",
    method: "GET",
    success: function (campaigns) {
      console.log(campaigns);
      campaigns.forEach((campaign) => {
        const currentAmount = campaign.currentamountraised;
        const totalAmount = campaign.totalgoal;
        const averageTemp = (currentAmount / totalAmount) * 100;
        var average;
        var status;
        if (averageTemp >= 100) {
          average = 100;
          status = "Successful";
        } else {
          average = averageTemp;
          status = "Ongoing";
        }

        const newDiv = document.createElement("div");
        newDiv.className = "campaign-card";
        newDiv.innerHTML = `
                <div class="d-flex justify-content-between">
                    <h4>
                        ${campaign.eventname}
                        <span>/${status}</span>
                    </h4>
                    <h4>
                        Goal Amount
                        <label>:$${campaign.totalgoal}</label>
                    </h4>
                </div>
                <div class="progress mb-3">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100" style="width:${average}% "></div>
                </div>
                <div class="d-flex justify-content-between">
                    <h4>
                        Total Amount Collected
                        <label>:$${campaign.currentamountraised}</label>
                    </h4>
                    <h4>
                        Campaign Date
                        <label>:${campaign.date}</label>
                     </h4>
                </div>
                
                
                `;
        var body = document.getElementById("allCampaigns");
        body.appendChild(newDiv);

        const newOption = document.createElement("option");
        newOption.value = campaign.campaign_id;
        newOption.text = campaign.eventname;
        const selectElement = document.getElementById('campaignName');
        selectElement.appendChild(newOption);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getOngoingCampaigns() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getOngoingCampaigns.php",
    method: "GET",
    success: function (campaigns) {
      console.log(campaigns);
      campaigns.forEach((campaign) => {
        if (campaign.currentamountraised < campaign.totalgoal) {
          const currentAmount = campaign.currentamountraised;
          const totalAmount = campaign.totalgoal;
          const averageTemp = (currentAmount / totalAmount) * 100;
          var average;
          var status;
          if (averageTemp >= 100) {
            average = 100;
          } else {
            average = averageTemp;
          }

          var status = "Ongoing";
          const newDiv = document.createElement("div");
          newDiv.className = "campaign-card";
          newDiv.innerHTML = `
                  <div class="d-flex justify-content-between">
                  <h4>
                      ${campaign.eventname}
                      <span>/${status}</span>
                  </h4>
                  <h4>
                      Goal Amount
                      <label>:$${campaign.totalgoal}</label>
                  </h4>
              </div>
              <div class="progress mb-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${average}%"></div>
              </div>
              <div class="d-flex justify-content-between">
              <h4>
                  Total Amount Collected
                  <label>:$${campaign.currentamountraised}</label>
              </h4>
              <h4>
                Campaign Date
                <label>:${campaign.date}</label>
              </h4>
          </div>
                  
                  `;
          var body = document.getElementById("ongoingCampaigns");
          body.appendChild(newDiv);
        }
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getSuccessfulCampaigns() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getSuccessfulCampaign.php",
    method: "GET",
    success: function (campaigns) {
      console.log(campaigns);
      campaigns.forEach((campaign) => {
        if (campaign.currentamountraised >= campaign.totalgoal) {
          const currentAmount = campaign.currentamountraised;
          const totalAmount = campaign.totalgoal;
          const averageTemp = (currentAmount / totalAmount) * 100;
          var average;
          var status;
          if (averageTemp >= 100) {
            average = 100;
          } else {
            average = averageTemp;
          }
  
          var status = Successful
          const newDiv = document.createElement("div");
          newDiv.className = "campaign-card";
          newDiv.innerHTML = `
                  <div class="d-flex justify-content-between">
                  <h4>
                      ${campaign.eventname}
                      <span>/${status}</span>
                  </h4>
                  <h4>
                      Goal Amount
                      <label>:$${campaign.totalgoal}</label>
                  </h4>
              </div>
              <div class="progress mb-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${average}%"></div>
              </div>
              <div class="d-flex justify-content-between">
              <h4>
                  Total Amount Collected
                  <label>:$${campaign.currentamountraised}</label>
              </h4>
              <h4>
                  Campaign Date
                  <label>:${campaign.date}</label>
               </h4>
          </div>
                  
                  `;
          var body = document.getElementById("successfulCampaigns");
          body.appendChild(newDiv);
        }
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getUserData() {
  $.ajax({
    url: "http://localhost/Codeschool/Task5/FundRaiser/server/api/getUser.php",
    method: "POST",
    data: {
      token: localStorage.getItem("token"),
    },
    success: function (response) {
      console.log(response);
      const userData = JSON.parse(response);
      console.log(userData);

      $("#profileName").text(userData.data.user.fullname);
      $("#userIdentity").text(userData.data.user.user_id);
      $("#userIdentityTwo").text(userData.data.user.user_id);


    },
    error: function (response) {
      // let data = JSON.parse(response.responseText);
      // localStorage.removeItem("token");
      // location.href = "./login.html?error=" + data.message;
      console.log(response);
    },
  });
}

