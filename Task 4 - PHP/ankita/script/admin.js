let products = [];
let category = [];

let productName ;
let userInfo;
userInfo = localStorage.getItem('user_info');
userInfo = JSON.parse(userInfo );

if(userInfo.user_types_id ==2){

   alert("you are  not a admin ");
  window.location.replace("http://localhost/week6/login.html");
  
}




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

   const spcialPattern = /[!@@#$%^^&*()_>:{<>_(*^$#@!#$^*())}]/;
   const imagePattern=/\.([jJ][pP][eE][gG]|[gG][iI][fF]|[pP][nN][gG])$/;
    let name = $("#typeProductName").val();
    let productPrice = $("#typeProductPrice").val();
    let image=$("#typeProductImage").val();
    let category_id=$("#catagoryType").val();
    $("#catagoryTypeError").text("");
    $("#typeProductNameError").text("");
     $("#typeProductPriceError").text("");
 $("#typeProductImageError").text("");
     if (category_id==" ") {
        alert("plz  select the catregory type");
        $("#typeProductNameError").text("plz  select the catregory type");
        return;
    }


    if (!name) {
        alert("plz enter the  productName");
        $("#typeProductNameError").text("plz enter the  productName");
        return;
    }
    if (spcialPattern.test(name)) {
        alert("plz enter the  productName without special symbol");
        $("#typeProductNameError").text("plz enter the  productName without special symbol");
        return;
    }

    if (name.length > 12) {
        alert("plz enter the  productName lessthan 12 character");
        $("#typeProductNameError").text("plz enter the  productName lessthan 12 character");
        return;
    }
   


    if (!image ) {
        alert("plz enter the  product price");
        $("#typeProductPrice").text("plz enter the  product price");
        return;
    }
   
     if (imagePattern.test(image)) {
        alert("plz choose only image file");
        $("#typeProductImageError").text("plz choose only image file");
        return;
    }
   
    if (!productPrice ) {
        alert("plz enter the  product price");
        $("#typeProductPriceError").text("plz enter the  product price");
        return;
    }
    if (isNaN(productPrice )) {
        alert("enter only numbers");
        $("#typeProductPriceError").text("enter only numbers");
        return;
    }


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