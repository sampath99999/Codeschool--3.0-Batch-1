function updatebook(){

    let id = $("#id").val();
    let bookname = $("#bookname").val();
    let productimage = $("#bookimage").val();
    let author = $("#author").val();
    let price = $("#price").val();

    $.ajax({
        url: "./api/updatebooks.php",
        method: "POST",
        data: {
            id,
            bookname,
            bookimage,
            author,
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