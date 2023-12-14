if (!localStorage.getItem("token")) {
    location.href = "./pages/login.html";
}

$.ajax({
    url: "http://localhost/Codeschool/Task4/api/getUser.php",
    method: "POST",
    data: {
        token: localStorage.getItem("token"),
    },
    success: function (response) {
        response = JSON.parse(response);
        $("#name").text(response.data.user.name);
    },
    error: function (response) {
        let data = JSON.parse(response.responseText);
        localStorage.removeItem("token");
        location.href = "./pages/login.html?error=" + data.message;
    },
});


var prod_id;




$(document).ready(() => {


        
    getAllProducts();
    

   

    $(document).on("click", ".card", function () {
        user_id = localStorage.getItem("prod_id", prod_id);
       

        window.location.href = "pages/card.html";
    });
    





    
});

function getAllProducts() {
    fetch("http://localhost/Codeschool/Task4/api/getAllProducts.php", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        
    }).then((response) => response.json()
    ).then((data) => {
        const products = data;
        console.log("inside fetch data")
        console.log(products);
        products.forEach(product => {
            const imgSrc = product.image;
            const name = product.name;
            const category = product.category_name;
            const price = product.price;
            console.log(name);
          
            const newDiv = document.createElement('div');
            newDiv.className = 'card d-flex flex-column align-items-center m-2';
            newDiv.innerHTML = `
            <img src="${imgSrc}" alt="shoes-img" class="cardImg"/>
            <h4 class="mt-3 cardCompanyName">${name}</h4>
            <p class="cardProductName">${category}</p>
            <h6 class="cardProductPrice">$${price}</h6>
            `;
            var productList = document.getElementById("productList");
            productList.appendChild(newDiv);
        })

    }).catch(error => {
        console.log(error);
    });
}





