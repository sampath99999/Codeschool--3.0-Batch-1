


function login() {
    window.location.replace("http://localhost/week6/login.html");
}

function home() {
    window.location.replace("http://localhost/week6/home.html");
}






function validateregistation() {
    const spcialPattern = /[!@@#$%^^&*()_>:{<>_(*^$#@!#$^*())}]/;
    let name = $("#typeusername").val();
    $("#typeusernameErrorr").text("");
    if (!name) {
        alert("plz enter the  username");
        $("#typeusernameError").text("plz enter the  username");
        return;
    }
    if (spcialPattern.test(name)) {
        alert("plz enter the  username without special symbol");
        $("#typeusernameError").text("plz enter the  username without special symbol");
        return;
    }

    if (name.length > 12) {
        alert("plz enter the  username lessthan 12 character");
        $("#typeusernameError").text("plz enter the  username lessthan 12 character");
        return;
    }
    let phoneNo = $("#typePhone").val();
    $("#typePhoneError").text("");
    if (!phoneNo) {
        alert("plz enter the  phone number");
        $("#typePhoneError").text("plz enter the  phone number");
        return;
    }
    if (phoneNo.length != 10) {
        alert("plz enter the 10 digit phone number  ");
        $("#typePhoneError").text("plz enter the 10 digit phone number ");
        return;
    }
    if (isNaN(phoneNo)) {
        alert("enter only numbers");
        $("#typePhoneError").text("enter only numbers");
        return;
    }
    let emailId = $("#TypeEmail").val();
    $("#TypeEmailError").text("");
    if (!emailId) {
        alert("plz enter the valid email");
        $("#TypeEmailError").text("plz enter the valid email");
        return;
    }
    const pattern = /[@.@@ ]/;
    if (!pattern.test(emailId)) {
        alert("plz enter the valid email with @.com ");
        $("#TypeEmailError").text("plz enter the valid email with @");
        return;
    }

    let passWord = $("#TypePassword").val();
    $("#TypePasswordError").text("");
    if (!passWord) {
        alert("plz enter the password");
        $("#TypePasswordError").text("plz enter the password");
        return;
    }
    if (passWord.length < 2 || passWord.length > 22) {
        alert("plz enter the password in between 3 to 21 charcter ");
        $("#typePasswordError").text("plz enter the password in between 3 to 21 charcter ");
        return;
    }

    let reenterPassword = $("#retypePassword").val();
    $("#retypePasswordError").text("");
    if (!reenterPassword) {
        alert("plz  re enter the password");
        $("#retypePasswordError").text("plz  re enter the password");
        return;
    }
    if (reenterPassword != passWord) {
        alert("plz  re enter the same password");
        $("#retypePasswordError").text("plz  re enter the same password");
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
        url: "api/registerapi.php",
        data: formData,
        dataType: "JSON",
        success: function (data) {

            if (data.status) {



                alert(data.message, " ", "success");
                window.location.replace("http://localhost/week6/login.html");
            } else {
                alert(data.message, " ", "error");
            }
        },
        error: function (err) {
            $("#error").text(err);
        }
    });

}