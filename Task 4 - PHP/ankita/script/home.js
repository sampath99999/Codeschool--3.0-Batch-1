let products = [];
let category = [];

function login() {
  window.location.replace("http://localhost/week6/login.html");
}

function home() {
  window.location.replace("http://localhost/week6/home.html");
}

function register() {
  window.location.replace("http://localhost/week6/register.html");
}

function myOrder() {
  window.location.replace("http://localhost/week6/myOrder.html");
}

let userInfo;
let myCart = [];
userInfo = localStorage.getItem('user_info');
userInfo = JSON.parse(userInfo );
console.log(userInfo,54);


myCart = JSON.parse(localStorage.getItem('my_cart'));

if(!myCart){

myCart = [];
}

console.log('a', myCart);
if (userInfo) {

  $('#loginButton').empty();
  $('#registerButton').empty();

  if(userInfo.user_types_id ==2){
 $('#cart').text(JSON.parse(localStorage.getItem('my_cart')));
  cartCount();

setAndGetCartItem();
  }else{
  alert(" your are not a customer ");
   window.location.replace("http://localhost/week6/login.html");

}
}

else {
  $('#myOrderBox').empty();
   $('#cart').text('');

  $('#logOutButton').empty();

}
$.ajax({
  url: 'api/homeapi.php',
  method: 'GET',
  dataType: 'json',
  success: function (data) {
    // alert(data.message);
    products = data.myResult.product;
    addProductToCard(data.myResult.product);
    addcatagory(data.myResult.category);
   
  },
  error: function (status) {
    console.log('Request failed with status: ' + status);
  }
});


function addProductToCard(products) {

  $('#productData').empty();

  for (let i = 0; i < products.length; i++) {

   
    $('#productData').append(`
            <div class="col-lg-3 col-md-6 col-12">
          <div class="ms-3">
            <div
              class="card mt-5 px-4 border-2 shadow-lg justify-content-center"
              style="width: 15rem; height: 20rem"
            >
              <img src="${products[i].image}" class="card-img-top h-50" alt="..." />
              <div class="card-body">
                <h5 class="card-title m-0 fs-4">${products[i].name}</h5>
                <p class="card-text m-0">
                  price :<span class="fs-3 ps-1">${products[i].price}</span>
                </p>
                <a href="#" class="btn btn-primary" onclick= "addToCart(${i})">Add to cart</a>
              </div>
            </div>
          </div>
        </div>
            `)
  };
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


function filterProduct() {

  let formData = {
    category_id: $('#catagoryType').val()
  }

  $.ajax({
    url: 'api/filterProductapi.php',
    method: 'POST',
    dataType: 'json',
    data: formData,
    success: function (data) {
      products = data.data;
      addProductToCard(data.data)
    },
    error: function (status) {
      console.log('Request failed with status: ' + status);
    }
  });
}



function addToCart(index) {
console.log('bsss', myCart);
let product = products[index];

console.log(index)
  product.quantity = 1;

  let status = false;

console.log(product,myCart)
  for (let i = 0; i < myCart.length; i++) {

    if (myCart[i].id == product.id) {
      myCart[i].quantity += 1;
      status = true;
      break;
    }
  }

console.log(status)
if(!status){

myCart.push(product);


}


// return;

  if (userInfo) {
    $.ajax({
      url: 'api/addProductToCartApi.php',
      method: 'POST',
      dataType: 'json',
      data: { product: product,user_id:userInfo.id },
      success: function (data) {
         cartCount();

      },
      error: function (status) {
        console.log('Request failed with status: ' + status);
      }
    });

  }else{
 window.location.replace("http://localhost/week6/login.html");
}

}

  // cartCount()






function orderNow() {

  if (myCart.length == 0) {

    alert("Please add product to the cart")
  }

  if (!userInfo) {
    alert("Please login to complete your order");
    localStorage.setItem('my_cart', JSON.stringify(myCart))
    window.location.replace('login.html')
  }


 $.ajax({
      url: 'api/orderproduct.php',
      method: 'POST',
      dataType: 'json',
      data: { product: myCart,user_id:userInfo.id },
      success: function (data) {

if(data.status){
 cartCount();
alert(data.message);
$('#closebutton').click();
}
        

      },
      error: function (status) {
        console.log('Request failed with status: ' + status);
      }
    });

}

function setAndGetCartItem() {

  const formData = {
    user_id: userInfo.id,
    products: JSON.parse(localStorage.getItem('my_cart'))
  }


$.ajax({
      url: 'api/setandgetmycart.php',
      method: 'POST',
      dataType: 'json',
      data: formData,
      success: function (data) {
  if(data.status) {
        console.log(45);
        myCart = data.data;
console.log(myCart,23456);
          showCart(myCart);
}

      },
      error: function (status) {
        console.log('Request failed with status: ' + status);
      }
    });


}
function showCart() {
  console.log(3456);
  $("#showMyCart").empty();
  if (myCart.length == 0) {

    $("#showMyCart").text("no product in your cart");
  } else {
    for (let i = 0; i < myCart.length; i++) {

      console.log(23);

      $("#showMyCart").append(`<tr>
             <th scope="row">${i + 1}</th>
             <td>
               <img src="${myCart[i].image}" alt="" height="100px" />
             </td>
             <td>${myCart[i].name}</td>
             <td>${myCart[i].quantity}</td>
           </tr>`)

    };
   
  }

  console.log(myCart)
}




function logout(){
    localStorage.removeItem('user_info');
    localStorage.removeItem('tokan');
    alert("logout successfully");
    window.location.reload('http://localhost/week6/home.html');
   


}


function cartCount(){

const formData = {
    user_id: userInfo.id,
  
  }
    $.ajax({
  url: 'api/countCartProductapi.php',
  method: 'POST',
  dataType: 'json',
data:formData,
  success: function (data) {

   let myCartCount = data.data;
console.log(myCartCount);
    $("#cart").text(myCartCount[0].count);
    
  },
  error: function (status) {
    console.log('Request failed with status: ' + status);
  }
});

}