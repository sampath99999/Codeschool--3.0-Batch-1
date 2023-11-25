











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

               if(data.data.validLogInId[0].user_types_id==1){
                      
                window.location.replace("http://localhost/week7/admin.html");
                     }else{
                    window.location.replace("http://localhost/week7/user.html");

                          }
                
               
             localStorage.setItem("user_info", JSON.stringify(data.data.validLogInId[0]));
                localStorage.setItem("token", JSON.stringify(data.data.token));
            } else {
                alert(data.message, " ", "error");
            }
        },
        error: function (err) {
            $("#error").text(err);
        }
    });
}