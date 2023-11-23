function register() {
    window.location.replace("http://localhost/week6/register.html");
}

function home() {
    window.location.replace("http://localhost/week6/home.html");
}

let userInfo;
userInfo = localStorage.getItem('user_info');
userInfo = JSON.parse(userInfo );
if(userInfo){

   alert("you are already logged in please cilck log-out to do login ");
    if(userInfo.user_types_id ==2){

alert("you are already logged in please cilck log-out to do login ");

setTimeout(function(){ 
window.location.replace("http://localhost/week6/home.html");
}, 3000);
    

}else{
setTimeout(function(){ 
window.location.replace("http://localhost/week6/admin.html");

}, 3000);
}
  
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
    const passWordPattern = /[!@@#$%^^&*()_>:{<>_(*^$#@!#$^*())}]/;
    let passWord = $("#typePassword").val();
    $("#typePasswordError").text("");
    if (!passWord) {
        alert("plz enter the password");
        $("#typePasswordError").text("plz enter the password");
        return;
    }

    const formData = {

        email: emailId,
        password: passWord

    }

    $.ajax({
        type: "POST",
        url: "api/loginapi.php",
        data: formData,
        dataType: "JSON",
        success: function (data) {

            if (data.status) {
                
                alert(data.message, " ", "success");

               if(data.data.myResult[0].user_types_id==1){
                      
                window.location.replace("http://localhost/week6/admin.html");
                     }else{
                    window.location.replace("http://localhost/week6/home.html");

                          }
                
               
             localStorage.setItem("user_info", JSON.stringify(data.data.myResult[0]));
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