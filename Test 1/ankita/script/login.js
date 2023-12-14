


let userInfo;
userInfo = localStorage.getItem('user_info');
userInfo = JSON.parse(userInfo);
let token;
token = localStorage.getItem('token');
token = JSON.parse(token);
if (userInfo) {


    window.location.replace("http://localhost/testday/dashBorad.html");

}





function sidebar() {

    document.getElementById('sideBar').classList.toggle('d-none');
    document.getElementById('mainContent').classList.toggle('col-12');


}



function validatelogin() {
    let emailId = $("#typeEmail").val();
    $("#typeEmailError").text("");
    if (!emailId) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The Valid Email ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })


        $("#typeEmailError").text("Please Enter The Valid Email");
    }
    const pattern = /[@.@@ ]/;
    if (!pattern.test(emailId)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The Valid Email With @.com  ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        // alert("Please Enter The Valid Email With @.com ");
        $("#typeEmailError").text("Please Enter The Valid Email With @.com ");
        return;
    }
    let passWord = $("#typePassword").val();
    $("#typePasswordError").text("");
    if (!passWord) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The Password ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        // alert("Please Enter The Password");
        $("#typePasswordError").text("Please Enter The Password");
        return;
    }



    const formData = {

        email: emailId,
        password: passWord

    }

    $.ajax({
        type: "POST",
        url: "api/logIn.php",
        data: formData,
        dataType: "JSON",
        success: function (data) {

            if (data.status) {

                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                    denyButtonText: ``
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        window.location.replace("http://localhost/testday/dashBorad.html");
                        localStorage.setItem("user_info", JSON.stringify(data.data.validLogInId[0]));
                        localStorage.setItem("token", JSON.stringify(data.data.token));
                    }
                });


            } else {
                Swal.fire({

                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })

            }
        },
        error: function (err) {
            $("#error").text(err);
        }
    });
}