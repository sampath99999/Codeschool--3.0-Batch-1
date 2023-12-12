// $.ajax({
//     url: "./api/retrieve.php",
//     success: function (data) {
//       callProduct(data);
//       console.log(data);
//     },
//   });
  
//   function callProduct(products) {
//     let data1 = "";
//     products.map((values) => {
//       data1 += `<tr>
//       <th scope="row">${values.id}</th>
//       <td>${values.productname}</td>
//       <td>${values.productimage}</td>
//       <td>${values.price}</td>
//       <td class="ms-4" >
//           <button  class="btn btn-danger"><a class="text-decoration-none text-light" href="">UPDATE</a></button>
//           <button class="btn btn-primary"><a class="text-decoration-none text-light " href="">DELETE</a></button>
//       </td>
//     </tr>`;
//     });
//     $("#cards").html(data1);
//   }

$.ajax({
    url: "./api/retrieve.php",
    success: function (data) {
      callProduct(data);
      console.log(data);
    },
  });
  
  function callProduct(response) {
    let data1 = "";
    for (let i = 0; i < response.length; i++) {
      let values = response[i];
      data1 += `<tr>
        <th scope="row">${i+1}</th>
        <td>${values.roductnapme}</td>
        <td><img src='${values.productimage}' alt="Image" height="100px" width="90px"</td>
        <td>${values.price}</td>
        
        // onclick="updateproduct(${values.id})"

        <td class="ms-4 text-center">
       
            <button class="btn btn-danger"><a class="text-decoration-none text-light" href="./updateproduct.html">UPDATE</a></button>
            <button onclick="deleteproduct(${values.id})" id='' class="btn btn-primary"><a class="text-decoration-none text-light "  ">DELETE</a></button>
            
        </td>

       
      </tr>`;
    }
    $("#cards").html(data1);
  }
  
  
  