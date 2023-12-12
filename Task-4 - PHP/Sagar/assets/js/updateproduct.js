function updateproduct(){

        let id = $("#id").val();
        let productname = $("#productname").val();
        let productimage = $("#productimage").val();
        let price = $("#price").val();
    
        $.ajax({
            url: "./api/updateproduct.php",
            method: "POST",
            data: {
                id,
                productname,
                productimage,
                price,
            },
            success: (response) => {
                response = JSON.parse(response);
                if (!response.status) {
                    alert(response.message);
                    return false;
                }
                location.href='./dashboard.html';
            },
            error: (response) => {
                console.log(response);
            },
        });
    }
