
let products=[];
$.ajax({
    url: 'api/myOrderapi.php',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        products=data.data;
        showMyOrder(data.data);
    
    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});

function showMyOrder(products) {

    $('#showOrder').empty();
console.log(23654)

    for (let i = 0; i <products.length; i++) {
    console.log(9078)

        $('#showOrder').append(`
      <tr>
      <td scope="row">${i+1}</td>
      <td>${products[i].order_no}</td>
      <td>
        <img src="${products[i].image}" alt="" height="100px" />
      </td>
      <td>${products[i].name}</td>
      <td>${products[i].quantity}</td>
      <td>${products[i].total_price}</td>
      <td> <button class="btn btn-danger text-white">${products[i].order_status}</button></td>
    </tr>
              `)
    };
}