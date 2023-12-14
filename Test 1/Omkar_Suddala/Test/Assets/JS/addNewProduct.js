if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

function addProduct(user_id){
    
    let productName = $('#productName').val();
        let productImage=$('#productImage').val();
        let productActualPrice=$('#productActualPrice').val();
        let prdouctOfferPrice=$('#prdouctOfferPrice').val();
        let productSize=$('#productSize').val();
        let productRating=$('#productRating').val();
       let productReviews=$('#productReviews').val();


        $.ajax({
            url: "http://localhost/Test/Server/addProduct.php",
            method: "POST",
            data: {
                user_id,
        productName,
        productImage,
        productActualPrice,
        prdouctOfferPrice,
        productSize,
        productRating,
        productReviews
          },
            success: (response) => {
                response = JSON.parse(response);
                if (!response.status) {
                    Swal.fire({
                        title: "Bad job!",
                        text: response.message,
                        icon: "error"
                      });
                    return false;
                } else {
             Swal.fire({
                title: "Good job!",
                text: response.message,
                icon: "success"
              });
    
                location.href = "./index.html";
            }
            },
            error: (response) => {
                console.log(response);
            },
        });
    }
