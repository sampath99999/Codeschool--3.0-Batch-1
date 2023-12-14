

function sidebar(){

document.getElementById('sideBar').classList.toggle('d-none');
document.getElementById('mainContent').classList.toggle('col-12');


}


function login() {
    window.location.replace("http://localhost/testday/logIn.html");
}








function validateregistation() {
    const spcialPattern = /[!@@#$%^^&*()_>:{<>_(*^$#@!#$^*())}]/;
    let name = $("#typeusername").val();
    $("#typeusernameErrorr").text("");
    if (!name) {
 Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  UserName',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
      
        $("#typeusernameError").text("Please Enter The  UserName");
        return;
    }
    if (spcialPattern.test(name)) {
 Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  User Name Without Any Special Symbol ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    
        $("#typeusernameError").text("Please Enter The  User Name Without Any Special Symbol");
        return;
    }

    if (name.length > 12) {
 Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  User Name Lessthan 12 Character',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        $("#typeusernameError").text("Please Enter The  User Name Lessthan 12 Character");
        return;
    }
    let phoneNo = $("#typePhone").val();
    $("#typePhoneError").text("");
    if (!phoneNo) {
 Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  Phone Number ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
      
        $("#typePhoneError").text("Please Enter The  Phone Number");
        return;
    }
    if (phoneNo.length != 10) {
 Swal.fire({
            title: 'Error!',
            text: 'Please Enter The 10 Digit Phone Number  ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
       
        $("#typePhoneError").text("Please Enter The 10 Digit Phone Number ");
        return;
    }
    if (isNaN(phoneNo)) {
 Swal.fire({
            title: 'Error!',
            text: 'Please Enter Only Numbers ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
       
        $("#typePhoneError").text(" Please Enter Only Numbers");
        return;
    }
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
        return;
    }
    const pattern = /[@.@@ ]/;
    if (!pattern.test(emailId)) {
 Swal.fire({
            title: 'Error!',
            text: 'Please Enter The Valid Email With @.com  ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        
        $("#typeEmailError").text("Please Enter The Valid Email With @.com");
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
        $("#typePasswordError").text("Please Enter The Password");
        return;
    }
    if (passWord.length < 2 || passWord.length > 22) {
 Swal.fire({
            title: 'Error!',
            text: 'Please Enter The Password in Between 3 to 21 Charcter  ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
      
        $("#typePasswordError").text("Please Enter The Password in Between 3 to 21 Charcter ");
        return;
    }

    let reEnterPassword = $("#retypePassword").val();
    $("#retypePasswordError").text("");
    if (!reEnterPassword) {
 Swal.fire({
            title: 'Error!',
            text: 'Please  Re-enter The Password ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
      
        $("#retypePasswordError").text("Please  Re-enter The Password");
        return;
    }
    if (reEnterPassword != passWord) {
 Swal.fire({
            title: 'Error!',
            text: 'Password Does Not Match ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
       
        $("#retypePasswordError").text("Password Does Match");
        return;
    }



    const formData = {
        name: name,
        email: emailId,
        password: passWord,
        phone: phoneNo
    }

    $.ajax({
        type: "POST",
        url: "api/register.php",
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
                    if (result.isConfirmed) {
                         window.location.replace("http://localhost/testday/logIn.html");
                       
                    }
                });


               
            } else {
 Swal.fire({
            title: 'Error!',
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