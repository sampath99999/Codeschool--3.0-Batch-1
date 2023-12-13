function showForm() {
    var block = document.getElementById("form");
    if (block.style.display == "none") {
        block.style.display = "block";
    } else {
        block.style.display = "none";
    }
}

$.ajax({
    url: "./backend/get_campaigns.php",
    method: "GET", // Specify the HTTP method
    dataType: "json", // Expect JSON data in the response
    success: function(data) {
      // Process the retrieved data
      console.log(data);
  
      let dataHtml = "";
      for (let i = 0; i < data.length; i++) {
        let campaign = data[i];
        dataHtml += `<tr>
          <th scope="row">${i+1}</th>
          <td><p class="label fs-5">${campaign.name}</p></td>
          <td><p>${campaign.description}</p></td>
          <td>${campaign.goal_amount}</td>
          <td class="ms-4">${campaign.start_date}</td>
          <td class="ms-4">${campaign.end_date}</td>
        </tr>`;
      }
  
      // Assuming you have an element with the id 'row' where you want to display the data
      $("#row").html(dataHtml);
    },
    error: function(response) {
      // Handle errors if any
      console.error("Error fetching data:", response);
    }
  });

