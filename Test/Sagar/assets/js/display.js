$.ajax({
    url: "./api/display.php",
    success: function (data) {
      callbooks(data);
      console.log(data);
    },
  });
  
  function callbooks(response) {
    let data1 = "";
    for (let i = 0; i < response.length; i++) {
      let values = response[i];
      data1 += `<tr>
        <th scope="row">${values.id}</th>
        <td>${values.bookname}</td>
        <td><img src='${values.bookimage}' alt="Image" height="100px" width="90px"</td>
        <td>${values.author}</td>
        <td>${values.price}</td>

        
        // onclick="updatebook(${values.id})"

        <td class="ms-4 text-center">
       
        

      
        <button class="btn btn-danger"><a target="blank" href="./updatebook.html" class="text-decoration-none text-light ">UPDATE</a></button>
            
            <button class="btn btn-primary onclick="deletebook(${values.id})"><a class="text-decoration-none text-light ">DELETE</a></button>
            
        </td>

       
      </tr>`;
    }
    $("#cards").html(data1);
  }