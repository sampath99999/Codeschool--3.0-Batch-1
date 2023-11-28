

$.ajax({
    url: "./backend/donation.php",
    method: "GET", // Specify the HTTP method
    dataType: "json", // Expect JSON data in the response
    success: function(data) {
  
      let dataHtml = "";
      for (let i = 0; i < data.length; i++) {
        let product = data[i];
        dataHtml += `<tr>
          <th scope="row">${i+1}</th>
          <td><p class="label fs-5">${product.donor_name}</p></td>
          <td><p>${product.donor_email}</p></td>
          <td>${product.amount}</td>
          <td class="ms-4">${product.donation_date}</td>
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



