if (!localStorage.getItem("token")) {
  window.location.href = "fundlogin.html";
}

$.ajax({
  url: "./api/validation.php",
  method: "POST",
  data: {
    token: localStorage.getItem("token"),
  },
  success: function (response) {
    response = JSON.parse(response);
    $("#name").text(response.data.user.name);
  },
  error: function (response) {
    let data = JSON.parse(response.responseText);
    localStorage.removeItem("token");
    location.href = "fundlogin.html?error=" + data.message;
  },
});

function logout() {
  localStorage.clear();
  location.href = "fund     login.html";
}

let campaign = document.getElementById("StartCampaign");
campaign.addEventListener("click", campaingPage);

function campaingPage() {
  window.location.href = "campagins.html";
}

let donate = document.getElementById("Donate");
donate.addEventListener("click", donatePage);

function donatePage() {
  window.location.href = "donation.html";
}
