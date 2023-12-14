


// let userInfo;
// userInfo = localStorage.getItem('user_info');
// userInfo = JSON.parse(userInfo );
// let token;
// userInfo = localStorage.getItem('token');
// token = JSON.parse(token );
// if(userInfo){

//    alert("you are already logged in please cilck log-out to do login ");
//   window.location.replace("http://localhost/testday/dashBorad.html");
  
// }





function sidebar(){

document.getElementById('sideBar').classList.toggle('d-none');
document.getElementById('mainContent').classList.toggle('col-12');


}




function validatelogin() {
    let emailId = $("#typeEmail").val();
    $("#typeEmailError").text("");
    if (!emailId) {
        alert("plz enter the valid email");
        $("#typeEmailError").text("plz enter the valid email");
    }
    const pattern = /[@.@@ ]/;
    if (!pattern.test(emailId)) {
        alert("plz enter the valid email with @.com ");
        $("#typeEmailError").text("plz enter the valid email with @");
        return;
    }
    let passWord = $("#typePassword").val();
    $("#typePasswordError").text("");
    if (!passWord) {
        alert("plz enter the password");
        $("#typePasswordError").text("plz enter the password");
        return;
    }
if (passWord.length <8 || passWord.length>12) {
        alert("pasword should be minimum 8 character and maximum 16 character ");
        $("#typePasswordError").text("pasword should be minimum 8 character and maximum 16 character");
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
                
                alert(data.message, " ", "success");

              window.location.replace("http://localhost/testday/dashBorad.html");s
               
             localStorage.setItem("user_info", JSON.stringify(data.data.validLogInId[0].id));
                localStorage.setItem("token", JSON.stringify(data.data.token));
            console.log(data.data.validLogInId[0].id,1234);
            } else {
                alert(data.message, " ", "error");
            }
        },
        error: function (err) {
            $("#error").text(err);
        }
    });
}