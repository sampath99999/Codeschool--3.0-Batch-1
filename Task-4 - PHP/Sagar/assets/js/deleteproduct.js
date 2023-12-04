
function deleteproduct(id){
        
    $.ajax({
        url: "./api/deleteproduct.php",
        method: "POST",
        data: {
            id  
        },
        success: (response) => {
            response = JSON.parse(response);
            console.log(response);
            
        },
        error: (response) => {
            console.log(response);
        },
    });
    window.location.reload();
}