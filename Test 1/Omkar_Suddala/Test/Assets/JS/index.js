if (!localStorage.getItem("token")) {
    location.href = "./logIn.html";
}
var productsList='';
$.ajax({
    url: "http://localhost/Test/Server/index.php",
    method: "POST",
    data: {
        token: localStorage.getItem("token"),
    },
    success: function (response) {
        response = JSON.parse(response);
        products=response.data.user;
        console.log(products[0])
        var addProduct =`<span onclick="addProduct(${products[0].user_id})"> Add Product
        
        </span>`;
     $('#addProduct').html(addProduct)
        $(".name").text(products[0].fullname);
        products.forEach(element => {
            productsList +=`   <div class="d-flex flex-row flex-wrap gap-3 p-3 cards w-75">
            <div class="productImages bg-light">
              <img
                src="${element.productimage}"
                alt=""
                
                class="productImage img-fluid"
              />
            </div>
            <div class="me-3 d-flex flex-column gap-2">
               
                <span class=" fw-bold productTitle">${element.productname}</span> 
                <span><span class="fw-bold">${element.productrating}</span><i class="bi bi-star-fill text-success"></i> | <span class="text-secondary">${element.productreviews}Reviews</span></span>
                <h6>
                    <span class="fs-6 text-secondary">Size</span> <span class="text-black bg-white border border-1 border-secondary px-2">${element.productsize}</span>
                </h6>
            </div>
            <div class="productPrice ms-auto ">
              <span id="actualPrice" class=" actualPrice text-decoration-line-through text-secondary"
                >${element.productactualprice}</span
              > 
              <span id="offerPrice" class=" offerPrice text-secondary"
                >$<span class="fw-bold text-black">${element.prdouctofferprice}</span>.00</span
              >
            </div>

          </div>
          `;
        });
       
        $('#productsList').html(productsList);
    },
    error: function (response) {
        let data = JSON.parse(response.responseText);
        localStorage.removeItem("token");
        location.href = "./logIn.html?error=" + data.message;
    },
});


