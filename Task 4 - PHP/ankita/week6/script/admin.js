let products = [];
let category = [];

let productName ;

$.ajax({
    url: 'api/adminapi.php',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        products = data.data.product;
        category=data.data.category;
        addProduct(data.data.product);
        addcatagory(data.data.category);

    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});

function addProduct(products) {

    $('#tableData').empty();

    for (let i = 0; i < products.length; i++) {

        console.log(852)
        $('#tableData').append(`
        <tr>
                <td>
                  <img src="${products[i].image}" alt="" height="100px" />
                </td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td> <button class="btn btn-danger text-white" id="deleteBtn">delete</button></td>
              </tr>
        `)
    };
}

;

function addNewProduct() {

    let formData = {
         category_id: $('#catagoryType').val(),
        image: 'images/'+productName,
        price: $('#typeProductPrice').val(),
        name: $('#typeProductName').val()
    }

console.log(formData)

    $.ajax({
        url: 'api/addProduct.php',
        method: 'POST',
        dataType: 'json',
        data: formData,
        success: function (data) {
            products = data.data;
           
                alert(data.message, " ", "success");
        window.location.replace("http://localhost/week6/admin.html");
        },
        error: function (status) {
            console.log('Request failed with status: ' + status);
        }
    });


}


function setFileName(){

productName = document.getElementById('typeProductImage').files.item(0).name; 

console.log(productName)

}


function logout(){
    localStorage.removeItem('user_info');
    localStorage.removeItem('tokan');
    alert("logout successfully");
    window.location.replace('http://localhost/week6/home.html');
   


}





function addcatagory(category) {
  $('#catagoryType').empty();
  $('#catagoryType').append(`
       <option value="">Select Here</option>
       `)
  for (let i = 0; i < category.length; i++) {

    $('#catagoryType').append(`
        <option value="${category[i].id}">${category[i].categoryname}</option>
        `)

  };
}