// Function to logout
function logout() {
  localStorage.clear();
  location.href = "login.html";
}

$.ajax({
  url: "./api/Showpost.php",
  type: "GET",
  dataType: "json",
  success: function (data) {
    console.log("Data received from AJAX:", data);
    showblog(data);
  },
  error: function (xhr, status, error) {
    console.error("Error fetching data:", error);
    console.log("XHR:", xhr);
  },
});

function showblog(data) {
  // Assuming you have a container with id "cardContainer" to append the cards
  var cardContainer = $("#cardContainer");

  // Iterate over the received data
  data.forEach(function (post) {
    // Create Bootstrap card dynamically
    var cardHtml = `
      <div class="card m-2 shadow-bg" style="width: 75rem">
        <img src="${post.image}" class="card-img-top cardImage img-fluid" alt="..." />
        <div class="card-body">
          <h5 class="card-title font-style">${post.title}</h5>
          <
          <p class="card-text font-style">${post.description}</p>
        </div>
      </div>
    `;

    // Append the card to the cardContainer
    cardContainer.append(cardHtml);
  });
}
